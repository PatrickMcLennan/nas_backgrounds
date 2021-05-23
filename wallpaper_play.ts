import fs, { PathLike } from 'fs';
import axios, { AxiosResponse } from 'axios';
import { parse } from 'node-html-parser';
import { getIgnoreList, readdir } from 'lib';
import path from 'path';

Promise.all([
  axios({
    method: `GET`,
    headers: {
      'User-Agent': `Chrome/90`,
    },
    url: `https://wallpaperplay.com/board/ultra-wide-wallpapers#Seemore`,
  }),
  getIgnoreList(path.resolve(__dirname, `ignore-list.txt`)),
  readdir(path.resolve(__dirname)),
]).then(
  ([newResults, ignoreList, currentFiles]: [
    AxiosResponse<string>,
    string,
    string[]
  ]) => {
    const resultsHtml = parse(newResults.data);

    const anchorElements = 

    const currentImages: Map<string, null> =
      currentFiles?.reduce?.((all, current) => {
        const ext = path.extname(current);
        return ![`.png`, `.svg`, `.jpg`, `.jpeg`].includes(ext)
          ? all
          : all.set(current, null);
      }, new Map()) ?? new Map();

    const ignoredNames: Map<string, null> =
      ignoreList
        ?.split?.(`\n`)
        ?.reduce?.(
          (all, current) => (current ? all.set(current, null) : all),
          new Map()
        ) ?? new Map();
  }
);
