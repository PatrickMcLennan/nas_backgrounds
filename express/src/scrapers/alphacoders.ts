import axios, { AxiosResponse } from 'axios';
import {
  getIgnoreList,
  readdir,
  ignoredNamesMap,
  currentImagesMap,
  nameImage,
  downloadImage,
} from './lib';
import path from 'path';
import parse from 'node-html-parser';

Promise.all([
  axios({
    method: `GET`,
    headers: {
      'User-Agent': `Chrome/90`,
    },
    url: `https://wall.alphacoders.com/by_resolution.php?w=3840&h=1600`,
  }),
  getIgnoreList(path.resolve(__dirname, `../../../ignore-list.txt`)),
  readdir(path.resolve(__dirname, `../../../`)),
])
  .then(
    ([pageHtml, ignoreList, currentFiles]: [
      AxiosResponse<string>,
      string,
      string[]
    ]) => {
      const resultsHtml = parse(pageHtml.data);

      const imageResults =
        Array.from(
          resultsHtml?.querySelectorAll?.(`.boxgrid`) ?? [],
          (element) => {
            const img = element.querySelector?.(`img[loading="lazy"]`);
            const url =
              img
                ?.getAttribute?.(`src`)
                ?.replace?.(/thumb-/g, ``)
                ?.replace?.(/thumbbig-/g, ``) ?? ``;

            const title = nameImage(
              url.split?.(`/`)[url.split?.(`/`)?.length - 1] ?? ``
            );
            return { url, title };
          }
        )?.reduce?.((all, { title, url }) => {
          if (!url.length || !title.length) return all;
          else return all.set(title, url);
        }, new Map()) ?? new Map();

      const ignoredNames = ignoredNamesMap(ignoreList);
      const currentImages = currentImagesMap(currentFiles);

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

      imageResults.forEach((_value, key, resultsMap) => {
        if (ignoredNames.has(key) || currentImages.has(key))
          return resultsMap.delete(key);
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
      `${newDownloads.length} image(s) successfully downloaded from https://wall.alphacoders.com/by_resolution.php?w=3840&h=1600`
    )
  )
  .catch((err) => console.error(err));
