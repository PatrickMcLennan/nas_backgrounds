import { GetStaticPaths, GetStaticProps } from 'next';
import { browserClient } from '../../clients';

interface Props extends GetStaticProps {
  params: { image: string };
}

export default function Title(image: string) {}

export const getStaticPaths: GetStaticPaths = async () =>
  browserClient({
    method: `GET`,
    url: `/images`,
  })
    .then((res) => ({
      paths: res.data.map((image) => ({
        params: {
          image,
        },
      })),
      fallback: false,
    }))
    .catch((err) => ({
      paths: {
        params: {
          image: `404`,
        },
      },
      fallback: true,
    }));

export const getStaticProps: GetStaticProps = async ({ params }: Props) =>
  browserClient({
    method: `GET`,
    url: `/image/${params.image}`,
  })
    .then((res) => ({
      props: {
        image: res.data,
      },
    }))
    .catch((err) => ({
      props: {
        image: `404`,
      },
    }));
