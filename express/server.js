"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lib_1 = require("./scrapers/lib");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("./graphql/resolvers/resolvers");
const typeDefs_1 = require("./graphql/typeDefs/typeDefs");
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: path_1.default.resolve(__dirname, `../.env`) });
const corsOptions = {
    origin: `http://localhost:3000`,
};
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDefs_1.typeDefs,
            resolvers: resolvers_1.resolvers,
        });
        app.use(morgan_1.default(`:method :url :status :res[content-length] - :response-time ms`));
        app.use(cors_1.default(corsOptions));
        app.get(`/api/image/:title`, (req, res) => {
            var _a;
            return lib_1.readdir(path_1.default.join((_a = process.env.IMAGES_DIR) !== null && _a !== void 0 ? _a : ``))
                .then((allFiles) => {
                const { title } = req.params;
                const map = lib_1.currentImagesMap(allFiles);
                const imageExists = map.has(title);
                return res
                    .status(imageExists ? 200 : 404)
                    .sendFile(path_1.default.resolve(__dirname, title ? `../../${title}` : `../html/404.html`));
            })
                .catch((err) => res.status(500).send(err));
        });
        app.get(`/api/image/compressed/:title/:size`, (req, res) => {
            var _a;
            const { title, size } = req.params;
            if (!title || !size)
                return res
                    .status(422)
                    .send(`A valid image title and size must be added as params.Ex: \n/api/image/compressed/:title/:size\ntitle: ${title}\nsize: ${size} `);
            const imagePath = path_1.default.resolve((_a = process.env.IMAGES_DIR) !== null && _a !== void 0 ? _a : ``, `compressed/${title}/${size}-${title}`);
            const image = fs_1.default.existsSync(imagePath);
            return res
                .status(image ? 200 : 404)
                .sendFile(image
                ? path_1.default.join(imagePath)
                : path_1.default.resolve(__dirname, `../../html/404.html`));
        });
        app.get(`/api/stream/movie/:name/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { name, id } = req.params;
            const { headers } = req;
            if (!name || !id)
                return res
                    .status(422)
                    .send(`A valid name and id must be added as params.Ex: \n/api/stream/movie/:name/:id\nname: ${name}\nid: ${id}`);
            const allMovies = yield lib_1.readdir((_a = process.env.MOVIES_DIR) !== null && _a !== void 0 ? _a : ``);
            if (!allMovies)
                return res.status(500).send(`The movies dir could not be found a ${process.env.MOVIES_DIR}`);
            const moviesMap = lib_1.currentMoviesMap(allMovies);
            const movie = moviesMap.get(id);
            if (!movie)
                return res.status(404).send(`${name} with the id of ${id} could not be found at ${process.env.MOVIES_DIR}`);
            const moviePath = path_1.default.join(`${process.env.MOVIES_DIR}/${name}`);
            const movieStats = fs_1.default.statSync(moviePath);
            if (!movieStats || !(movieStats === null || movieStats === void 0 ? void 0 : movieStats.size))
                return res.status(404).send(`${process.env.MOVIES_DIR}/${name} could not be found to stream or could not be streamed`);
            const range = headers === null || headers === void 0 ? void 0 : headers.range;
            const { size } = movieStats;
            if (range) {
                const parts = range.replace(/bytes=/, '').split('-');
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : Number(size) - 1;
                const chunksize = end - start + 1;
                const file = fs_1.default.createReadStream(moviePath, { start, end });
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mp4',
                };
                res.writeHead(206, head);
                file.pipe(res);
            }
            else {
                const head = {
                    'Content-Length': size,
                    'Content-Type': 'video/mp4',
                };
                res.writeHead(200, head);
                fs_1.default.createReadStream(moviePath).pipe(res);
            }
            return;
        }));
        app.use(`/fonts`, express_1.default.static(path_1.default.resolve(__dirname, `../../fonts`)));
        app.use(`/images`, express_1.default.static(path_1.default.resolve(__dirname, `../../`), {
            extensions: [`html`],
        }));
        app.use(express_1.default.static(path_1.default.resolve(__dirname, `html`)));
        yield server.start();
        server.applyMiddleware({ app, path: `/api/graphql` });
        app.listen({ port: 8080 }, () => console.log(`App is listening on Port 8080`));
    });
}
startServer();
