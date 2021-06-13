import { currentImagesMap, readdir, rename } from './lib';
import path from 'path';

import { config } from 'dotenv';

config({ path: path.resolve(__dirname, `../../../.env`) });

readdir(path.resolve(process.env.IMAGES_DIR ?? ``))
  .then((files) => {
    const images = currentImagesMap(files);
    return Promise.all(Array.from(images, ([title]) => rename(title)));
  })
  .then((newFiles) =>
    newFiles.forEach((message) => console.log(`${message}\n`))
  )
  .catch((err) => console.error(err));
