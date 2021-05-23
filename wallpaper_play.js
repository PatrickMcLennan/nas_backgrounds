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
])
    .then(([newResults, ignoreList, currentFiles]) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const resultsHtml = node_html_parser_1.parse(newResults.data);
    const imageResults = (_e = (_d = (_c = Array.from((_b = (_a = resultsHtml === null || resultsHtml === void 0 ? void 0 : resultsHtml.querySelectorAll) === null || _a === void 0 ? void 0 : _a.call(resultsHtml, `[data-download][data-src]`)) !== null && _b !== void 0 ? _b : [], (element) => {
        var _a, _b, _c, _d;
        return ({
            title: lib_1.nameImage((_b = (_a = element === null || element === void 0 ? void 0 : element.getAttribute) === null || _a === void 0 ? void 0 : _a.call(element, `data-src`)) !== null && _b !== void 0 ? _b : ``),
            url: (_d = (_c = element === null || element === void 0 ? void 0 : element.getAttribute) === null || _c === void 0 ? void 0 : _c.call(element, `data-download`)) !== null && _d !== void 0 ? _d : ``,
        });
    })) === null || _c === void 0 ? void 0 : _c.reduce) === null || _d === void 0 ? void 0 : _d.call(_c, (all, { title, url }) => {
        if (!title.length || !url.length)
            return all;
        else
            return all.set(title, url);
    }, new Map())) !== null && _e !== void 0 ? _e : new Map();
    const currentImages = (_g = (_f = currentFiles === null || currentFiles === void 0 ? void 0 : currentFiles.reduce) === null || _f === void 0 ? void 0 : _f.call(currentFiles, (all, current) => {
        const ext = path_1.default.extname(current);
        return ![`.png`, `.svg`, `.jpg`, `.jpeg`].includes(ext)
            ? all
            : all.set(current, null);
    }, new Map())) !== null && _g !== void 0 ? _g : new Map();
    const ignoredNames = (_l = (_k = (_j = (_h = ignoreList === null || ignoreList === void 0 ? void 0 : ignoreList.split) === null || _h === void 0 ? void 0 : _h.call(ignoreList, `\n`)) === null || _j === void 0 ? void 0 : _j.reduce) === null || _k === void 0 ? void 0 : _k.call(_j, (all, current) => (current ? all.set(current, null) : all), new Map())) !== null && _l !== void 0 ? _l : new Map();
    if (!imageResults.size || !currentImages.size || !ignoredNames.size)
        return Promise.reject(`${!imageResults.size
            ? `\nNo images were returned from the endpoint`
            : ``}${!ignoredNames.size ? `\nThe ignorelist couldn't be parsed` : ``}${!currentImages.size
            ? `\nThe current dir contents weren't found`
            : ``}`);
    imageResults.forEach((_value, key, imageMap) => {
        if (ignoredNames.has(key) || currentImages.has(key))
            return imageMap.delete(key);
        else
            return;
    });
    return Promise.all(Array.from(imageResults, ([title, url]) => lib_1.downloadImage({ title, url })));
})
    .catch((err) => console.error(err));
