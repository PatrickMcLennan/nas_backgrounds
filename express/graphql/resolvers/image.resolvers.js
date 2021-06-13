"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageResolvers = void 0;
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const lib_1 = require("../../scrapers/lib");
dotenv_1.config({ path: path_1.default.resolve(__dirname, `../../../.env`) });
exports.imageResolvers = {
    getImages: (_, { page }) => {
        var _a;
        return lib_1.readdir(path_1.default.join((_a = process.env.IMAGES_DIR) !== null && _a !== void 0 ? _a : ``)).then((allFiles) => {
            const map = lib_1.currentImagesMap(allFiles);
            const images = Array.from(map, ([current]) => ({ name: current }));
            return images.slice((page - 1) * 20, page * 20);
        });
    },
    allImages: () => {
        var _a;
        return lib_1.readdir(path_1.default.join((_a = process.env.IMAGES_DIR) !== null && _a !== void 0 ? _a : ``)).then(allFiles => {
            const map = lib_1.currentImagesMap(allFiles);
            const images = Array.from(map, ([current]) => ({ name: current }));
            return images;
        });
    }
};
