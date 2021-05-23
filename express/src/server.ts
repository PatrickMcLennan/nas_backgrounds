import express from 'express';
import { currentImagesMap, readdir, unlink } from './scrapers/lib';
import path from 'path';

const app = express();

app.get(`/images`, (_req, res) =>
  readdir(path.resolve(__dirname, `../../`))
    .then((allFiles) => {
      const map = currentImagesMap(allFiles);
      const images = Array.from(map, ([current]) => current);
      return res.send(images);
    })
    .catch((err) => res.status(500).send(err))
);

app.delete(`/image/:title`, (req, res) =>
  unlink(path.resolve(__dirname, `../../${req.params.title}`))
    .then((images) => res.status(204).send(images))
    .catch((err) => res.status(400).send(err))
);

app.use(`/`, (_req, res) =>
  res.sendFile(path.resolve(__dirname, `../html/index.html`))
);

app.use(`/image/:title`, (req, res) =>
  readdir(path.resolve(__dirname, `../../`))
    .then((allFiles) => {
      const { title } = req.params;
      const map = currentImagesMap(allFiles);
      const image = map.get(title);
      return res
        .status(image ? 204 : 404)
        .sendFile(
          path.resolve(__dirname, image ? `${title}.html` : `404.html`)
        );
    })
    .catch((err) => res.status(500).send(err))
);

app.get('*', (_req, res) =>
  res.status(404).sendFile(path.resolve(__dirname, `../html/404.html`))
);

app.listen(8080, () => console.log(`app is running`));
