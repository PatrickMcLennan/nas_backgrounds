import {
  Card,
  CardActionArea,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import { useState } from 'react';
import { browserClient } from '../clients';
import DocumentHead from '../components/Head';
import { useRouter } from 'next/router';
import BreadCrumbs from '../components/BreadCrumbs';
import ResponsiveImage from '../components/ResponsiveImage';

const StyledContainer = styled(Container)`
  .img {
    object-fit: cover;
    width: 100%;
  }
`;

export default function Index({
  images,
  error,
}: {
  images: string[];
  error: Error;
}) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  if (error) console.error(error);

  return (
    <>
      <DocumentHead
        title="Backgrounds"
        description="A GUI to review all scraped Backgrounds"
      />
      <BreadCrumbs />
      <StyledContainer>
        {images.length ? (
          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid item key={image} xs={12} sm={6} md={4} lg={4}>
                <Card variant="outlined">
                  <CardActionArea
                    aria-label={`View ${image}`}
                    onClick={() => router.push(`/image/${image}`)}
                    title={`View ${image}`}
                  >
                    <ResponsiveImage name={image} height={250} />
                    <Typography variant="h2" noWrap>
                      {image}
                    </Typography>
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
    </>
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
