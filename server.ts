import express from 'express';
import { currentImagesMap, currentMoviesMap, readdir } from './scrapers/lib';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import morgan from 'morgan';

import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers/resolvers';
import { typeDefs } from './graphql/typeDefs/typeDefs';

import { config } from 'dotenv';

config({ path: path.resolve(__dirname, `../.env`) });

const corsOptions = {
  origin: `http://localhost:3000`,
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.use(
    morgan(`:method :url :status :res[content-length] - :response-time ms`)
  );
  app.use(cors(corsOptions));

  app.get(`/api/image/:title`, (req, res) =>
    readdir(path.join(process.env.IMAGES_DIR ?? ``))
      .then((allFiles) => {
        const { title } = req.params;
        const map = currentImagesMap((allFiles as string[]));
        const imageExists = map.has(title);
        return res
          .status(imageExists ? 200 : 404)
          .sendFile(
            path.resolve(
              __dirname,
              title ? `../../${title}` : `../html/404.html`
            )
          );
      })
      .catch((err) => res.status(500).send(err))
  );

  app.get(`/api/image/compressed/:title/:size`, (req, res) => {
    const { title, size } = req.params;
    if (!title || !size)
      return res
        .status(422)
        .send(
          `A valid image title and size must be added as params.Ex: \n/api/image/compressed/:title/:size\ntitle: ${title}\nsize: ${size} `
        );

    const imagePath = path.resolve(
      process.env.IMAGES_DIR ?? ``,
      `compressed/${title}/${size}-${title}`
    );

    const image = fs.existsSync(imagePath);

    return res
      .status(image ? 200 : 404)
      .sendFile(
        image
          ? path.join(imagePath)
          : path.resolve(__dirname, `../../html/404.html`)
      );
  });

  app.get(`/api/stream/movie/:name/:id`, async (req, res) => {
    const { name, id } = req.params;
    const { headers } = req;
    if (!name || !id)
      return res
        .status(422)
        .send(
          `A valid name and id must be added as params.Ex: \n/api/stream/movie/:name/:id\nname: ${name}\nid: ${id}`
      );
    const allMovies = await readdir(process.env.MOVIES_DIR ?? ``);
    if (!allMovies) return res.status(500).send(`The movies dir could not be found a ${process.env.MOVIES_DIR}`);
    const moviesMap = currentMoviesMap((allMovies as string[]));
    const movie = moviesMap.get(id);
    if (!movie) return res.status(404).send(`${name} with the id of ${id} could not be found at ${process.env.MOVIES_DIR}`);
    const moviePath = path.join(`${process.env.MOVIES_DIR}/${name}`);

    const movieStats = fs.statSync(moviePath);

    if (!movieStats || !movieStats?.size) return res.status(404).send(`${process.env.MOVIES_DIR}/${name} could not be found to stream or could not be streamed`);

    const range = headers?.range;
  const { size } = movieStats;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : Number(size) - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(moviePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': size,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(moviePath).pipe(res);
  }
    return;
  })

  app.use(`/fonts`, express.static(path.resolve(__dirname, `../../fonts`)));
  app.use(
    `/images`,
    express.static(path.resolve(__dirname, `../../`), {
      extensions: [`html`],
    })
  );
  app.use(express.static(path.resolve(__dirname, `html`)));

  await server.start();
  server.applyMiddleware({ app, path: `/api/graphql` });
  app.listen({ port: 8080 }, () =>
    console.log(`App is listening on Port 8080`)
  );
}

startServer();
