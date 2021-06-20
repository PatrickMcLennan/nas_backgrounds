"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieResolvers = void 0;
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const lib_1 = require("../../scrapers/lib");
dotenv_1.config({ path: path_1.default.resolve(__dirname, `../../../.env`) });
exports.movieResolvers = {
    getMovies: (_, { amount, offset }) => {
        var _a;
        return lib_1.readdir(path_1.default.join((_a = process.env.MOVIES_DIR) !== null && _a !== void 0 ? _a : ``))
            .then((movies) => {
            const map = lib_1.currentMoviesMap(movies);
            const vettedMovies = Array.from(map, ([id, name]) => ({ id, name }));
            return vettedMovies.slice(offset, offset + amount);
        })
            .catch((err) => console.error(err));
    },
    allMovies: () => {
        var _a;
        return lib_1.readdir((_a = process.env.MOVIES_DIR) !== null && _a !== void 0 ? _a : ``).then((allMovies) => {
            const map = lib_1.currentMoviesMap(allMovies);
            const vettedMovies = Array.from(map, ([id, name]) => ({ id, name }));
            return vettedMovies;
        }).catch(err => console.error(err));
    },
};
