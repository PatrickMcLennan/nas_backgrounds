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
    url: `https://wallhaven.cc/search?categories=111&purity=100&resolutions=3840x1600&sorting=new&order=desc&page=4`,
  }),
  getIgnoreList(path.resolve(__dirname, `ignore-list.txt`)),
  readdir(path.resolve(__dirname)),
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
          resultsHtml?.querySelectorAll?.(`figure[data-wallpaper-id]`) ?? [],
          (element) => {
            const ext = element
              .querySelectorAll?.(`.thumb-info > span`)
              ?.find?.((span) => {
                const className = span.getAttribute?.(`class`) ?? ``;
                return !!className.length && className !== `wall-res`;
              })
              ?.getAttribute?.(`class`);

            const title = nameImage(
              `${element.getAttribute?.(`data-wallpaper-id`) ?? ``}.${
                ext ?? `jpg`
              }`
            );

            return {
              title,
              url: `https://w.wallhaven.cc/full/${title?.charAt?.(0) ?? ``}${
                title?.charAt?.(1) ?? ``
              }/wallhaven-${title}`,
            };
          }
        )?.reduce?.((all, { title, url }) => {
          console.log(title, url);
          if (!title.length || !url.length) return all;
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
      `${newDownloads.length} image(s) successfully downloaded from https://wallhaven.cc/search?categories=111&purity=100&resolutions=3840x1600&sorting=relevance&order=desc&page=4`
    )
  )
  .catch((err) => console.error(err));
