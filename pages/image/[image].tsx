import { Card } from '@material-ui/core';
import styled from 'styled-components';
import { InferGetStaticPropsType } from 'next';
import { nodeGraphQl } from '../../clients';
import DocumentHead from '../../components/Head';
import { gql } from 'graphql-request';

type Props = {
  params: {
    image: string;
  };
};

const IS_PROD = process.env.NODE_ENV === `production`;

const CardStyles = styled(Card)`
  width: 100%;

  img {
    height: 50%;
    width: 100%;
    object-fit: cover;
  }
`;

export default function Image({
  image,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <DocumentHead title={image} description={`View ${image}`} image={image} />
      <CardStyles variant="outlined" className="card">
        <img
          src={`http://${
            IS_PROD ? process.env.PROD_URL : process.env.DEV_URL
          }/api/image/compressed/${image}/large`}
          alt={image}
        />
        <h1 className="h1">{image}</h1>
      </CardStyles>
    </>
  );
}

export const getStaticPaths = async () =>
  nodeGraphQl
    .request(
      gql`
        query allImages {
          allImages {
            name
          }
        }
      `
    )
    .then((res) => ({
      paths: res.allImages.map((image: { name: string }) => ({
        params: {
          image: image.name,
        },
      })),
      fallback: false,
    }))
    .catch((err) => {
      console.error(err);
      return {
        paths: [{ params: { image: `404` } }],
        fallback: false,
      };
    });

export const getStaticProps = ({ params }: Props) => ({
  props: { image: params.image },
});
