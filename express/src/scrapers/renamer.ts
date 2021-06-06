import { currentImagesMap, readdir, rename } from './lib';
import path from 'path';

readdir(path.resolve(__dirname, `../../../`))
  .then((files) => {
    const images = currentImagesMap(files);
    return Promise.all(Array.from(images, ([title]) => rename(title)));
  })
  .then((newFiles) =>
    newFiles.forEach((message) => console.log(`${message}\n`))
  )
  .catch((err) => console.error(err));
