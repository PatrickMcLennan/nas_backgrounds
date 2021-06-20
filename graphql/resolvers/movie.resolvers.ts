import { config } from 'dotenv';
import path from 'path';
import { currentMoviesMap, readdir } from '../../scrapers/lib';

config({ path: path.resolve(__dirname, `../../../.env`) });

export const movieResolvers = {
  getMovies: (_: any, { amount, offset }: { amount: number; offset: number }) =>
    readdir(path.join(process.env.MOVIES_DIR ?? ``))
      .then((movies) => {
        const map = currentMoviesMap((movies as string[]));
        const vettedMovies = Array.from(map, ([id, name]) => ({ id, name }));
        return vettedMovies.slice(offset, offset + amount);
      })
      .catch((err) => console.error(err)),
  allMovies: () =>
    readdir(process.env.MOVIES_DIR ?? ``).then((allMovies) => {
      const map = currentMoviesMap((allMovies as string[]));
      const vettedMovies = Array.from(map, ([id, name]) => ({ id, name }));
      return vettedMovies;
    }).catch(err => console.error(err)),
};
