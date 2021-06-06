import { currentImagesMap, readdir, makeDir, makeFile } from './lib';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import path from 'path';
import { PathLike } from 'fs';

function jpegQuality(size: string): number {
  if (size === `small`) return 50;
  if (size === `medium`) return 75;
  if (size === `large`) return 100;
}

function pngQuality(size: string): [number, number] {
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
          .then((newPath) => Promise.resolve({ newPath, imageName }))
          .catch((error) =>
            Promise.reject({
              error,
              message: `Directory for ${imageName} was not made`,
            })
          )
      )
    );
  })
  .then((dirPaths) =>
    Promise.all(
      dirPaths.reduce(
        (all: Promise<PathLike>[], { newPath, imageName }) =>
          all.concat(
            [`small`, `medium`, `large`].map((size) =>
              new Promise(() =>
                imagemin([path.resolve(__dirname, `../../../${imageName}`)], {
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
                .then((imageData) => {
                  if (!imageData || !imageData?.[0]) {
                    console.error(`Error: no processedImg for ${imageData}`);
                    return;
                  }

                  return makeFile(
                    `${newPath}/${size}-${imageName}`,
                    imageData?.[0]?.data
                  );
                })
                .catch((error) =>
                  Promise.reject({
                    error,
                    message: `${imageName} could not be minified`,
                  })
                )
            )
          ),
        []
      )
    ).catch((error) =>
      Promise.reject({ error, message: `The imagemin promises broke: ` })
    )
  )
  .then((newPaths) =>
    console.log(
      `The following images were made: \n${newPaths.map(
        (newPath) => `${newPath}\n`
      )}`
    )
  )
  .catch(({ error, message }) =>
    console.error(`${message ? message : ``}\n\n${error}`)
  );
