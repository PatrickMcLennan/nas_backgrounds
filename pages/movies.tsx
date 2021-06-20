import { nodeGraphQl } from 'clients';
import DocumentHead from 'components/Head';
import { gql } from 'graphql-request';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

export default function Movies({
  movies,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(movies);
  if (error) console.error(error);
  return (
    <>
      <DocumentHead title="Movies" description="All movies" />
      {movies.map(({ name, id }) => (
        <Link href={`movie/${name}/${id}`} key={id}>
          <a>{name}</a>
        </Link>
      ))}
    </>
  );
}

export const getStaticProps = async () =>
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
