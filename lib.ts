import fs, { PathLike } from 'fs';
import https from 'https';

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

export function getIgnoreList(filePath: PathLike): Promise<string> {
  return new Promise((res, rej) =>
    fs.readFile(filePath, `utf-8`, (err, data) => (err ? rej(err) : res(data)))
  );
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
    .toLowerCase()
    .replace(/ /g, `-`)
    .replace(/\*/g, `-`)
    .replace(/\//g, `-`)
    .replace(/\[/g, `-`)
    .replace(/\]/g, `-`)
    .replace(/\|/g, `-`)
    .replace(/@/g, `-`);
}
