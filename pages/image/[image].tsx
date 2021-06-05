import { AxiosResponse } from 'axios';
import { InferGetStaticPropsType } from 'next';
import { browserClient } from '../../clients';

type Props = {
  params: {
    image: string;
  };
};

export default function Image({
  image,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1 className="h1">{image}</h1>
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

export const getStaticProps = async ({ params }: Props) =>
  browserClient({
    method: `GET`,
    url: `/api/image/${params.image}`,
  })
    .then((res: AxiosResponse<string>) => ({
      props: {
        image: res.data,
      },
    }))
    .catch((err) => {
      console.error(err);
      return { notFound: true };
    });
