import fs, { PathLike } from 'fs';
import https from 'https';
import path from 'path';

/**
 * Synology NAS's only support Node.js ~12
 *
 * You have to roll your own promise based fs solutions
 */

export function readdir(path: PathLike): Promise<string[]> {
  return new Promise((res, rej) =>
    fs.readdir(path, (err, files) => (err ? rej(err) : res(files)))
  );
}

export function currentImagesMap(currentFiles: string[]): Map<string, null> {
  return (
    currentFiles?.reduce?.((all, current) => {
      const ext = path.extname(current);
      return ![`.png`, `.svg`, `.jpg`, `.jpeg`].includes(ext)
        ? all
        : all.set(current, null);
    }, new Map()) ?? new Map()
  );
}

export function getIgnoreList(filePath: PathLike): Promise<string> {
  return new Promise((res, rej) =>
    fs.readFile(filePath, `utf-8`, (err, data) => (err ? rej(err) : res(data)))
  );
}

export function ignoredNamesMap(ignoreList: string): Map<string, null> {
  return (
    ignoreList
      ?.split?.(`\n`)
      ?.reduce?.(
        (all, current) => (current ? all.set(current, null) : all),
        new Map()
      ) ?? new Map()
  );
}

export function unlink(filePath: string): Promise<string> {
  return new Promise((res, rej) => {
    const ext = path.extname(filePath);
    if (![`.png`, `.svg`, `.jpg`, `.jpeg`].includes(ext) || !ext)
      return rej(
        `The selected file is not a supported image and can't be deleted`
      );
    return fs.unlink(filePath, (err) => {
      if (err) return rej(err);
      else return res(`${filePath} was deleted`);
    });
  });
}

export function downloadImage({
  title,
  url,
}: {
  title: string;
  url: string;
}): Promise<string> {
  return new Promise((res, rej) =>
    https.get(url, (httpRes) => {
      const stream = fs.createWriteStream(title);
      httpRes.pipe(stream);
      stream.on(`finish`, () => {
        stream.close();
        return res(`${title} downloaded`);
      });
      stream.on(`error`, (err) => rej(err));
    })
  );
}

export function nameImage(ogName: string): string {
  return ogName
    .trim()
    .toLowerCase()
    .replace(/ /g, `-`)
    .replace(/\*/g, `-`)
    .replace(/%/g, `-`)
    .replace(/\//g, `-`)
    .replace(/\[/g, `-`)
    .replace(/\]/g, `-`)
    .replace(/\|/g, `-`)
    .replace(/@/g, `-`);
}
