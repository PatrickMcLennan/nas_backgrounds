import { nodeGraphQl } from 'clients';
import DocumentHead from 'components/Head';
import { gql } from 'graphql-request';
import { InferGetStaticPropsType } from 'next';

export default function Movies({
  movies,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(movies);
  return (
    <>
      <DocumentHead title="Movies" description="All movies" />
      <p>movies will go here</p>
    </>
  );
}

export const getStaticProps = async () =>
  nodeGraphQl
    .request(
      gql`
        query allMovies {
          id
          name
        }
      `
    )
    .then((res) => ({
      props: {
        movies: res.allMovies,
        error: null,
      },
    }))
    .catch((error) => ({
      props: {
        movies: [],
        error: JSON.parse(JSON.stringify(error)),
      },
    }));
