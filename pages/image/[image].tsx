import { Card } from '@material-ui/core';
import styled from 'styled-components';
import { AxiosResponse } from 'axios';
import { InferGetStaticPropsType } from 'next';
import { browserClient } from '../../clients';
import DocumentHead from '../../components/Head';

type Props = {
  params: {
    image: string;
  };
};

const IS_PROD = process.env.NODE_ENV === `production`;

const CardStyles = styled(Card)`
  /* height: 80vh; */
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
          }/images/${image}`}
          alt={image}
        />
        <h1 className="h1">{image}</h1>
      </CardStyles>
    </>
  );
}

export const getStaticPaths = async () =>
  browserClient({
    method: `GET`,
    url: `/api/images`,
  })
    .then(({ data }: AxiosResponse<string[]>) => ({
      paths: data.map((image) => ({
        params: { image },
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
