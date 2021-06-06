import { currentImagesMap, readdir, makeDir } from './lib';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import path from 'path';

function jpegQuality(size: 'string'): number {
  if (size === `small`) return 50;
  if (size === `medium`) return 75;
  if (size === `large`) return 100;
}

function pngQuality(size: 'string'): [number, number] {
  if (size === `small`) return [0.5, 0.6];
  if (size === `medium`) return [0.7, 0.8];
  if (size === `large`) return [0.9, 1];
}

Promise.all([
  readdir(path.resolve(__dirname, `../../images`)),
  readdir(path.resolve(__dirname, `../../../`)),
])
  .then(([minifiedImageDirs, rawImages]) => {
    const rawMap = currentImagesMap(rawImages);

    rawMap.forEach((_value, key, srcMap) => {
      if (minifiedImageDirs.includes(key)) srcMap.delete(key);
      else return;
    });

    return Promise.all(
      Array.from(rawMap, ([imageName]) =>
        makeDir(path.resolve(__dirname, `../../images/${imageName}`))
      )
    );
  })
  .then((dirPaths) =>
    Promise.all(
      dirPaths.map((dirName) =>
        Promise.all(
          [`small`, `medium`, `large`].map((size) =>
            imagemin([path.resolve(__dirname, `../../../${dirName}`)], {
              destination: path.resolve(__dirname, `../../images`),
              plugins: [
                imageminMozjpeg({
                  quality: jpegQuality(size),
                }),
                imageminPngquant({
                  quality: pngQuality(size),
                }),
              ],
            })
          )
        )
      )
    )
  )
  .catch((err) => console.error(err));
