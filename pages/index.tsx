import {
  Card,
  CardActionArea,
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
    height: 250px;
    object-fit: cover;
    width: 100%;
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

  if (error) console.error(error);

  return (
    <StyledContainer>
      {images.length ? (
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item key={image} xs={12} md={6} lg={4}>
              <Card variant="outlined">
                <CardActionArea>
                  <img
                    className="img"
                    src={`http://${SRC_URL}/images/${image}`}
                    alt={image}
                    loading="lazy"
                  />
                  <Typography variant="h2">{image}</Typography>
                </CardActionArea>
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
