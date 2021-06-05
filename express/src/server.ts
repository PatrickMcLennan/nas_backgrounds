import express from 'express';
import { currentImagesMap, readdir, unlink } from './scrapers/lib';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

const corsOptions = {
  origin: `http://localhost:3000`,
};

const app = express();
app.use(
  morgan(`:method :url :status :res[content-length] - :response-time ms`)
);
app.use(cors(corsOptions));

app.get(`/api/images/:page?`, (req, res) =>
  readdir(path.resolve(__dirname, `../../`))
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
  unlink(path.resolve(__dirname, `../../${req.params.title}`))
    .then((images) => res.status(204).send(images))
    .catch((err) => res.status(400).send(err))
);

app.use(`/api/image/:title`, (req, res) =>
  readdir(path.resolve(__dirname, `../../`))
    .then((allFiles) => {
      const { title } = req.params;
      const map = currentImagesMap(allFiles);
      console.log(map);
      const image = map.get(title);
      return res
        .status(image ? 204 : 404)
        .sendFile(
          path.resolve(__dirname, image ? `${title}.html` : `404.html`)
        );
    })
    .catch((err) => res.status(500).send(err))
);

app.use(`/fonts`, express.static(path.resolve(__dirname, `../fonts`)));
app.use(`/images`, express.static(path.resolve(__dirname, `../../`)));
app.use(express.static(path.resolve(__dirname, `../html`)));

app.listen(8080, () => console.log(`app is running`));
