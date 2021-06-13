import axios, { AxiosResponse } from 'axios';
import { parse } from 'node-html-parser';
import {
  downloadImage,
  getIgnoreList,
  nameImage,
  readdir,
  currentImagesMap,
  ignoredNamesMap,
} from './lib';
import path from 'path';

import { config } from 'dotenv';

config({ path: path.resolve(__dirname, `../../../.env`) });

Promise.all([
  axios({
    method: `GET`,
    headers: {
      'User-Agent': `Chrome/90`,
    },
    url: `https://wallpaperplay.com/board/ultra-wide-wallpapers#Seemore`,
  }),
  getIgnoreList(path.resolve(process.env.IMAGES_DIR ?? ``, `ignore-list.txt`)),
  readdir(path.resolve(process.env.IMAGES_DIR ?? ``)),
])
  .then(
    ([newResults, ignoreList, currentFiles]: [
      AxiosResponse<string>,
      string,
      string[]
    ]) => {
      const resultsHtml = parse(newResults.data);

      const imageResults =
        Array.from(
          resultsHtml?.querySelectorAll?.(`[data-download][data-src]`) ?? [],
          (element) => ({
            title: nameImage(element?.getAttribute?.(`data-src`) ?? ``),
            url: element?.getAttribute?.(`data-download`) ?? ``,
          })
        )?.reduce?.((all, { title, url }) => {
          if (!title.length || !url.length) return all;
          else return all.set(title, url);
        }, new Map()) ?? new Map();

      const currentImages = currentImagesMap(currentFiles);
      const ignoredNames = ignoredNamesMap(ignoreList);

      if (!imageResults.size || !currentImages.size || !ignoredNames.size)
        return Promise.reject(
          `${
            !imageResults.size
              ? `\nNo images were returned from the endpoint`
              : ``
          }${!ignoredNames.size ? `\nThe ignorelist couldn't be parsed` : ``}${
            !currentImages.size
              ? `\nThe current dir contents weren't found`
              : ``
          }`
        );

      imageResults.forEach((_value, key, imageMap) => {
        if (ignoredNames.has(key) || currentImages.has(key))
          return imageMap.delete(key);
        else return;
      });

      return Promise.all(
        Array.from(imageResults, ([title, url]) =>
          downloadImage({ title, url })
        )
      );
    }
  )
  .then((newDownloads) =>
    console.log(
      `${newDownloads.length} image(s) successfully downloaded from https://wallpaperplay.com/board/ultra-wide-wallpapers#Seemore`
    )
  )
  .catch((err) => console.error(err));
