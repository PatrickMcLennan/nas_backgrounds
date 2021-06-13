import { config } from 'dotenv';
import path from 'path';
import { currentImagesMap, readdir } from '../../express/src/scrapers/lib';

config({ path: path.resolve(__dirname, `../../.env`) });

export const imageResolvers = {
  getImages: (_: any, { page }: { page: number }) =>
    readdir(path.resolve(process.env.IMAGES_DIR ?? ``)).then((allFiles) => {
      const map = currentImagesMap(allFiles);
      const images = Array.from(map, ([current]) => current);
      return images.slice((page - 1) * 20, page * 20);
    }),
};
