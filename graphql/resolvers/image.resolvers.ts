import { config } from 'dotenv';
import path from 'path';
import { currentImagesMap, readdir } from '../../scrapers/lib';

config({ path: path.resolve(__dirname, `../../../.env`) });

export const imageResolvers = {
  getImages: (_: any, { page }: { page: number }) =>
    readdir(path.join(process.env.IMAGES_DIR ?? ``)).then((allFiles) => {
      const map = currentImagesMap((allFiles as string[]));
      const images = Array.from(map, ([current]) => ({ name: current }));
      return images.slice((page - 1) * 20, page * 20);
    }),
  allImages: () => readdir(path.join(process.env.IMAGES_DIR ?? ``)).then(allFiles => {
    const map = currentImagesMap((allFiles as string[]));
    const images = Array.from(map, ([current]) => ({ name: current }));
    return images;
  })
};
