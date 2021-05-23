"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const node_html_parser_1 = require("node-html-parser");
const lib_1 = require("lib");
const path_1 = __importDefault(require("path"));
Promise.all([
    axios_1.default({
        method: `GET`,
        headers: {
            'User-Agent': `Chrome/90`,
        },
        url: `https://wallpaperplay.com/board/ultra-wide-wallpapers#Seemore`,
    }),
    lib_1.getIgnoreList(path_1.default.resolve(__dirname, `ignore-list.txt`)),
    lib_1.readdir(path_1.default.resolve(__dirname)),
]).then(([newResults, ignoreList, currentFiles]) => {
    var _a, _b, _c, _d, _e, _f;
    const resultsHtml = node_html_parser_1.parse(newResults.data);
    const anchorElements = ;
    const currentImages = (_b = (_a = currentFiles === null || currentFiles === void 0 ? void 0 : currentFiles.reduce) === null || _a === void 0 ? void 0 : _a.call(currentFiles, (all, current) => {
        const ext = path_1.default.extname(current);
        return ![`.png`, `.svg`, `.jpg`, `.jpeg`].includes(ext)
            ? all
            : all.set(current, null);
    }, new Map())) !== null && _b !== void 0 ? _b : new Map();
    const ignoredNames = (_f = (_e = (_d = (_c = ignoreList === null || ignoreList === void 0 ? void 0 : ignoreList.split) === null || _c === void 0 ? void 0 : _c.call(ignoreList, `\n`)) === null || _d === void 0 ? void 0 : _d.reduce) === null || _e === void 0 ? void 0 : _e.call(_d, (all, current) => (current ? all.set(current, null) : all), new Map())) !== null && _f !== void 0 ? _f : new Map();
});
