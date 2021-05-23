import axios, { AxiosResponse } from 'axios';
import { readdir, getIgnoreList, downloadImage, nameImage } from './lib';
import path from 'path';

Promise.all([
  axios({
    method: `GET`,
    headers: {
      'User-Agent': `Chrome/90`,
    },
    url: `https://www.reddit.com/r/widescreenwallpaper/new/.json?count=30`,
  }),
  getIgnoreList(path.resolve(__dirname, `ignore-list.txt`)),
  readdir(path.resolve(__dirname)),
])
  .then(
    ([newResults, ignoreList, currentFiles]: [
      AxiosResponse<{
        data?: {
          children?: {
            data?: { title: string; url_overridden_by_dest: string };
          }[];
        };
      }>,
      string,
      string[]
    ]) => {
      const wallpapers: Map<string, string> =
        newResults?.data?.data?.children?.reduce?.((all, { data }) => {
          const title = data?.title;
          const url = data?.url_overridden_by_dest;
          const ext = url?.split?.(`.`)[url?.split?.(`.`)?.length - 1 ?? 0];

          return !title ||
            title?.length >= 255 ||
            !url ||
            url?.length >= 255 ||
            !ext ||
            ext?.length >= 255
            ? all
            : all.set(`${nameImage(title)}.${ext}` ?? `NULL`, url);
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

      if (!wallpapers.size || !ignoredNames.size || !currentImages.size)
        return Promise.reject(
          `${
            !wallpapers.size
              ? `\nNo images were returned from the endpoint`
              : ``
          }${!ignoredNames.size ? `\nThe ignorelist couldn't be parsed` : ``}${
            !currentImages.size
              ? `\nThe current dir contents weren't found`
              : ``
          }`
        );

      wallpapers.forEach((_value, key, wallpapersMap) => {
        if (ignoredNames.has(key) || currentImages.has(key))
          return wallpapersMap.delete(key);
        else return;
      });

      return Promise.all(
        Array.from(wallpapers, ([title, url]) => downloadImage({ title, url }))
      );
    }
  )
  .catch((err) => console.error(err));
