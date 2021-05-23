import fs, { PathLike } from 'fs';
import axios, { AxiosResponse } from 'axios';
import { parse } from 'node-html-parser';
import { downloadImage, getIgnoreList, nameImage, readdir } from 'lib';
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

    const imageResults = 
      Array
        .from(resultsHtml?.querySelectorAll?.(`[data-download][data-src]`) ?? [], element => ({
          title: nameImage(element?.getAttribute?.(`data-src`) ?? ``),
          url: element?.getAttribute?.(`data-download`) ?? ``
        }))
        ?.reduce?.((all, { title, url }) => {
          if (!title.length || !url.length) return all;
          else return all.set(title, url)
        }, new Map()) ?? new Map();


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

    if (!imageResults.size || !currentImages.size || !ignoredNames.size)
      return Promise.reject(`${
        !imageResults.size
          ? `\nNo images were returned from the endpoint`
          : ``
      }${!ignoredNames.size ? `\nThe ignorelist couldn't be parsed` : ``}${
        !currentImages.size
          ? `\nThe current dir contents weren't found`
          : ``
      }`);
    
    imageResults.forEach((_value, key, imageMap) => {
      if (ignoredNames.has(key) || currentImages.has(key))
        return imageMap.delete(key);
      else return;
    });

    return Promise.all(Array.from(imageResults, ([title, url]) => downloadImage({ title, url })));
  }
).catch(err => console.error(err))
