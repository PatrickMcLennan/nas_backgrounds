import {
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import { useState } from 'react';
import { browserClient } from '../clients';

const StyledContainer = styled(Container)`
  .img {
    min-height: 250px;
    object-fit: cover;
  }
`;

const SRC_URL =
  process.env.NODE_ENV === `development`
    ? process.env.DEV_URL
    : process.env.PROD_URL;

export default function Index({
  images,
  error,
}: {
  images: string[];
  error: Error;
}) {
  const [page, setPage] = useState(1);

  console.log(images);
  console.log(process.env.DEV_URL);

  return (
    <StyledContainer>
      {images.length ? (
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item key={image}>
              <Card>
                <img
                  className="img"
                  src={`http://${SRC_URL}/api/image/${image}`}
                  alt={image}
                  loading="lazy"
                />
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
    </StyledContainer>
  );
}

export async function getStaticProps() {
  return browserClient({
    method: `GET`,
    url: `/api/images/1`,
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
