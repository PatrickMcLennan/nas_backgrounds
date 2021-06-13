import express from 'express';
import { currentImagesMap, readdir, unlink } from './scrapers/lib';
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

const app = express();
app.use(
  morgan(`:method :url :status :res[content-length] - :response-time ms`)
);
app.use(cors(corsOptions));

app.get(`/api/images/:page?`, (req, res) =>
  readdir(path.join(__dirname, `../../`))
    .then((allFiles) => {
      const pagination = Number(req.params.page);
      const map = currentImagesMap(allFiles);
      const images = Array.from(map, ([current]) => current);
      return res.send(
        pagination && !isNaN(pagination)
          ? images.slice((pagination - 1) * 20, pagination * 20)
          : images
      );
    })
    .catch((err) => res.status(500).send(err))
);

app.delete(`/api/image/:title`, (req, res) =>
  unlink(path.join(process.env.IMAGES_DIR ?? ``, `${req.params.title}`))
    .then((images) => res.status(204).send(images))
    .catch((err) => res.status(400).send(err))
);

app.get(`/api/image/:title`, (req, res) =>
  readdir(process.env.IMAGES_DIR ?? ``)
    .then((allFiles) => {
      const { title } = req.params;
      const map = currentImagesMap(allFiles);
      const imageExists = map.has(title);
      /**
       * RETURN HERE
       */
      return res
        .status(imageExists ? 200 : 404)
        .sendFile(
          path.resolve(__dirname, title ? `../../${title}` : `../html/404.html`)
        );
    })
    .catch((err) => res.status(500).send(err))
);

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

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
          ? path.resolve(imagePath)
          : path.resolve(__dirname, `../html/404.html`)
      );
  });

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
