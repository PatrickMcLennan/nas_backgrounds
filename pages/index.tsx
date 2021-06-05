import {
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { browserClient } from '../clients';

export default function Index({
  images,
  error,
}: {
  images: string[];
  error: Error;
}) {
  const [page, setPage] = useState(1);

  return (
    <Container>
      {images.length ? (
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item key={image}>
              <Card>
                <CardMedia image={image} title={image} />
                <Typography variant="h2">{image}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Typography variant="h2">No images were found!</Typography>
          <Typography>
            It looks like there was an issue getting the images at build time.
          </Typography>
        </>
      )}
    </Container>
  );
}

export async function getStaticProps() {
  return browserClient({
    method: `GET`,
    url: `/images/1`,
  })
    .then((res) => ({
      props: {
        images: res.data,
        error: null,
      },
    }))
    .catch((error) => ({
      props: {
        images: [],
        error: JSON.parse(JSON.stringify(error)),
      },
    }));
}
