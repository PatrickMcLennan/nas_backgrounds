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
dotenv_1.config({ path: path_1.default.resolve(__dirname, `../../.env`) });
const corsOptions = {
    origin: `http://localhost:3000`,
};
const app = express_1.default();
app.use(morgan_1.default(`:method :url :status :res[content-length] - :response-time ms`));
app.use(cors_1.default(corsOptions));
app.get(`/api/images/:page?`, (req, res) => lib_1.readdir(path_1.default.resolve(__dirname, `../../`))
    .then((allFiles) => {
    const pagination = Number(req.params.page);
    const map = lib_1.currentImagesMap(allFiles);
    const images = Array.from(map, ([current]) => current);
    return res.send(pagination && !isNaN(pagination)
        ? images.slice((pagination - 1) * 20, pagination * 20)
        : images);
})
    .catch((err) => res.status(500).send(err)));
app.delete(`/api/image/:title`, (req, res) => lib_1.unlink(path_1.default.resolve(__dirname, `../../${req.params.title}`))
    .then((images) => res.status(204).send(images))
    .catch((err) => res.status(400).send(err)));
app.get(`/api/image/:title`, (req, res) => lib_1.readdir(path_1.default.resolve(__dirname, `../../`))
    .then((allFiles) => {
    const { title } = req.params;
    const map = lib_1.currentImagesMap(allFiles);
    const imageExists = map.has(title);
    return res
        .status(imageExists ? 200 : 404)
        .sendFile(path_1.default.resolve(__dirname, title ? `../../${title}` : `../html/404.html`));
})
    .catch((err) => res.status(500).send(err)));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDefs_1.typeDefs,
            resolvers: resolvers_1.resolvers,
        });
        yield server.start();
        const app = express_1.default();
        server.applyMiddleware({ app, path: `/api/graphql` });
        app.listen({ port: 8080 });
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
                ? path_1.default.resolve(imagePath)
                : path_1.default.resolve(__dirname, `../html/404.html`));
        });
        app.use(`/fonts`, express_1.default.static(path_1.default.resolve(__dirname, `../../fonts`)));
        app.use(`/images`, express_1.default.static(path_1.default.resolve(__dirname, `../../`), {
            extensions: [`html`],
        }));
        app.use(express_1.default.static(path_1.default.resolve(__dirname, `html`)));
    });
}
startServer();
