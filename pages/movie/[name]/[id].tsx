import { nodeGraphQl } from 'clients';
import { gql } from 'graphql-request';
import ReactPlayer from 'react-player';

type Props = {
  name: string;
  id: string;
};

const IS_PROD = process.env.NODE_ENV === `production`;

export default function Movie({ name, id }: Props) {
  const url = `http://${
    IS_PROD ? process.env.PROD_URL : process.env.DEV_URL
  }/api/stream/movie/${name}/${id}`;
  return (
    <>
      <p>{name}</p>
      <p>{id}</p>
      <ReactPlayer url={url} controls volume={1} />
    </>
  );
}

export const getStaticPaths = async () =>
  nodeGraphQl
    .request(
      gql`
        query allMovies {
          allMovies {
            id
            name
          }
        }
      `
    )
    .then((res) => ({
      paths: res.allMovies.map(
        ({ id, name }: { id: string; name: string }) => ({
          params: {
            name,
            id,
          },
        })
      ),
      fallback: false,
    }))
    .catch((err) => {
      console.error(err);
      return {
        paths: [
          {
            params: {
              name: `404`,
              id: `404`,
            },
          },
        ],
        fallback: false,
      };
    });

export const getStaticProps = ({
  params: { name, id },
}: {
  params: Props;
}) => ({
  props: {
    name,
    id,
  },
});
