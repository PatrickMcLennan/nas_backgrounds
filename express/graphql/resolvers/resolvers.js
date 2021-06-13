"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const image_resolvers_1 = require("./image.resolvers");
exports.resolvers = {
    Query: Object.assign({}, image_resolvers_1.imageResolvers),
};
