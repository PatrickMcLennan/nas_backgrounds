"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameImage = exports.downloadImage = exports.ignoredNamesMap = exports.getIgnoreList = exports.currentImagesMap = exports.readdir = void 0;
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
function readdir(path) {
    return new Promise((res, rej) => fs_1.default.readdir(path, (err, files) => (err ? rej(err) : res(files))));
}
exports.readdir = readdir;
function currentImagesMap(currentFiles) {
    var _a, _b;
    return ((_b = (_a = currentFiles === null || currentFiles === void 0 ? void 0 : currentFiles.reduce) === null || _a === void 0 ? void 0 : _a.call(currentFiles, (all, current) => {
        const ext = path_1.default.extname(current);
        return ![`.png`, `.svg`, `.jpg`, `.jpeg`].includes(ext)
            ? all
            : all.set(current, null);
    }, new Map())) !== null && _b !== void 0 ? _b : new Map());
}
exports.currentImagesMap = currentImagesMap;
function getIgnoreList(filePath) {
    return new Promise((res, rej) => fs_1.default.readFile(filePath, `utf-8`, (err, data) => (err ? rej(err) : res(data))));
}
exports.getIgnoreList = getIgnoreList;
function ignoredNamesMap(ignoreList) {
    var _a, _b, _c, _d;
    return ((_d = (_c = (_b = (_a = ignoreList === null || ignoreList === void 0 ? void 0 : ignoreList.split) === null || _a === void 0 ? void 0 : _a.call(ignoreList, `\n`)) === null || _b === void 0 ? void 0 : _b.reduce) === null || _c === void 0 ? void 0 : _c.call(_b, (all, current) => (current ? all.set(current, null) : all), new Map())) !== null && _d !== void 0 ? _d : new Map());
}
exports.ignoredNamesMap = ignoredNamesMap;
function downloadImage({ title, url, }) {
    return new Promise((res, rej) => https_1.default.get(url, (httpRes) => {
        const stream = fs_1.default.createWriteStream(title);
        httpRes.pipe(stream);
        stream.on(`finish`, () => {
            stream.close();
            return res(`${title} downloaded`);
        });
        stream.on(`error`, (err) => rej(err));
    }));
}
exports.downloadImage = downloadImage;
function nameImage(ogName) {
    return ogName
        .toLowerCase()
        .replace(/ /g, `-`)
        .replace(/\*/g, `-`)
        .replace(/\//g, `-`)
        .replace(/\[/g, `-`)
        .replace(/\]/g, `-`)
        .replace(/\|/g, `-`)
        .replace(/@/g, `-`);
}
exports.nameImage = nameImage;
