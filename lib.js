"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameImage = exports.downloadImage = exports.getIgnoreList = exports.readdir = void 0;
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
function readdir(path) {
    return new Promise((res, rej) => fs_1.default.readdir(path, (err, files) => (err ? rej(err) : res(files))));
}
exports.readdir = readdir;
function getIgnoreList(filePath) {
    return new Promise((res, rej) => fs_1.default.readFile(filePath, `utf-8`, (err, data) => (err ? rej(err) : res(data))));
}
exports.getIgnoreList = getIgnoreList;
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
