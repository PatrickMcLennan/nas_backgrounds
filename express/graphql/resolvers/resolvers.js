"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const image_resolvers_1 = require("./image.resolvers");
const movie_resolvers_1 = require("./movie.resolvers");
exports.resolvers = {
    Query: Object.assign(Object.assign({}, image_resolvers_1.imageResolvers), movie_resolvers_1.movieResolvers),
};
