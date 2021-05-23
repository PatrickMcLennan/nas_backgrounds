import express from 'express';
import { currentImagesMap, readdir, unlink } from './scrapers/lib';
// import bodyParser from 'body-parser';
// import { graphqlExpress } from 'apollo-server-express';
import path from 'path';
// import cors from 'cors';

const app = express();

// app.use(express.static(path.resolve(__dirname, `../html`)));

app.get(`/images`, async (req, res) => {
  console.log(req.params);
  const allFiles = await readdir(path.resolve(__dirname, `../../`));
  const map = currentImagesMap(allFiles);
  const images = Array.from(map, ([current, _null]) => current);
  return res.send(images);
});

app.delete(`/image/:title`, (req, res) =>
  unlink(path.resolve(__dirname, `../../${req.params.title}`))
    .then((res) => console.log(res))
    .catch((err) => res.status(400).send(err))
);

app.use(`/`, (req, res) => res.send(`hello?`));

app.listen(3000, () => console.log(`app is running`));
