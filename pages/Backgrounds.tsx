import {
  Box,
  Card,
  CardActionArea,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { nodeGraphQl } from '../clients';
import InfiniteScroll from 'react-infinite-scroll-component';
import DocumentHead from '../components/Head';
import { useRouter } from 'next/router';
import ResponsiveImage from '../components/ResponsiveImage';
import { useState } from 'react';
import { gql } from 'graphql-request';
import { useGetImagesLazyQuery } from 'types/generated.types';
import { useLoading } from 'stores/loadingStore';
import GridScrollLoader from '../components/GridScrollLoader';

const useStyles = makeStyles(() => ({
  img: {
    objectFit: `cover`,
  },
}));

export default function Backgrounds({
  images,
  error,
}: {
  images: { name: string }[];
  error: Error;
}) {
  const classes = useStyles();
  const [paginatedImages, setPaginatedImages] = useState(images);
  const [outOfImages, setOutOfImages] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { setLoading } = useLoading(({ setLoading }) => ({ setLoading }));
  const [getImages] = useGetImagesLazyQuery({
    onCompleted: ({ getImages }) => {
      if (!getImages || !getImages?.map) {
        setOutOfImages(true);
      } else {
        const newImages = getImages.map((image) => ({
          name: image?.name ?? ``,
        }));
        setPaginatedImages((prevImages) => [...prevImages, ...newImages]);
        setPage((prevPage) => prevPage + 1);
      }
      return setLoading(false);
    },
    variables: {
      page: page + 1,
    },
  });

  const getMoreImages = () => {
    setLoading(true);
    return getImages();
  };

  if (error) console.error(error);

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
          id="scrollDiv"
          spacing={1}
          dataLength={paginatedImages.length}
          loader={<GridScrollLoader />}
          next={getMoreImages}
          hasMore={!outOfImages}
          scrollableTarget="scrollDiv"
        >
          {paginatedImages.map(({ name }: { name: string }) => (
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
