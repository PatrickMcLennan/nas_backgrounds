import {
  Box,
  Card,
  CardActionArea,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { nodeGraphQl } from '../clients';
import InfiniteScroll from 'react-infinite-scroll-component';
import DocumentHead from '../components/Head';
import { useRouter } from 'next/router';
import ResponsiveImage from '../components/ResponsiveImage';
import { useState } from 'react';
import { gql } from 'graphql-request';

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    objectFit: `cover`,
  },
}));

export default function Index({
  images,
  error,
}: {
  images: { name: string }[];
  error: Error;
}) {
  const classes = useStyles();
  const [paginatedImages, setPaginatedImages] = useState(images);
  const [page, setPage] = useState(1);
  const router = useRouter();

  if (error) console.error(error);

  const repaginate = () => {
    const currentPage = page;
    // return Promise.all();
  };

  return (
    <>
      <DocumentHead
        title="Backgrounds"
        description="A GUI to review all scraped Backgrounds"
      />
      {paginatedImages.length ? (
        <Grid
          container
          component={InfiniteScroll}
          spacing={1}
          dataLength={paginatedImages.length}
          loader={<p>loading . . .</p>}
          next={() => console.log(`running`)}
          hasMore={true}
        >
          {images.map(({ name }: { name: string }) => (
            <Grid item key={name} xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardActionArea
                  aria-label={`View ${name}`}
                  onClick={() => router.push(`/image/${name}`)}
                  title={`View ${name}`}
                >
                  <ResponsiveImage
                    className={classes.img}
                    name={name}
                    height={250}
                  />
                  <Box component="figcaption" p={1}>
                    <Typography variant="caption" noWrap>
                      {name}
                    </Typography>
                  </Box>
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
    </>
  );
}

export const getStaticProps = async () =>
  nodeGraphQl
    .request(
      gql`
        query getImages($page: Int!) {
          getImages(page: $page) {
            name
          }
        }
      `,
      {
        page: 1,
      }
    )
    .then((res) => ({
      props: {
        images: res.getImages,
        error: null,
      },
    }))
    .catch((error) => ({
      props: {
        images: [],
        error: JSON.parse(JSON.stringify(error)),
      },
    }));
