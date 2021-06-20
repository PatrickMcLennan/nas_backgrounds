import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Image = {
  __typename?: 'Image';
  name: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allImages?: Maybe<Array<Maybe<Image>>>;
  getImages?: Maybe<Array<Maybe<Image>>>;
  allMovies?: Maybe<Array<Maybe<Movie>>>;
  getMovies?: Maybe<Array<Maybe<Movie>>>;
};


export type QueryGetImagesArgs = {
  page: Scalars['Int'];
};


export type QueryGetMoviesArgs = {
  amount: Scalars['Int'];
  offset: Scalars['Int'];
};


export type GetImagesQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type GetImagesQuery = (
  { __typename?: 'Query' }
  & { getImages?: Maybe<Array<Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'name'>
  )>>> }
);

export type AllImagesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllImagesQuery = (
  { __typename?: 'Query' }
  & { allImages?: Maybe<Array<Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'name'>
  )>>> }
);

export type GetMoviesQueryVariables = Exact<{
  amount: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetMoviesQuery = (
  { __typename?: 'Query' }
  & { getMovies?: Maybe<Array<Maybe<(
    { __typename?: 'Movie' }
    & Pick<Movie, 'id' | 'name'>
  )>>> }
);

export type AllMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMoviesQuery = (
  { __typename?: 'Query' }
  & { allMovies?: Maybe<Array<Maybe<(
    { __typename?: 'Movie' }
    & Pick<Movie, 'id' | 'name'>
  )>>> }
);


export const GetImagesDocument = gql`
    query getImages($page: Int!) {
  getImages(page: $page) {
    name
  }
}
    `;

/**
 * __useGetImagesQuery__
 *
 * To run a query within a React component, call `useGetImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImagesQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetImagesQuery(baseOptions: Apollo.QueryHookOptions<GetImagesQuery, GetImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetImagesQuery, GetImagesQueryVariables>(GetImagesDocument, options);
      }
export function useGetImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetImagesQuery, GetImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetImagesQuery, GetImagesQueryVariables>(GetImagesDocument, options);
        }
export type GetImagesQueryHookResult = ReturnType<typeof useGetImagesQuery>;
export type GetImagesLazyQueryHookResult = ReturnType<typeof useGetImagesLazyQuery>;
export type GetImagesQueryResult = Apollo.QueryResult<GetImagesQuery, GetImagesQueryVariables>;
export const AllImagesDocument = gql`
    query allImages {
  allImages {
    name
  }
}
    `;

/**
 * __useAllImagesQuery__
 *
 * To run a query within a React component, call `useAllImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllImagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllImagesQuery(baseOptions?: Apollo.QueryHookOptions<AllImagesQuery, AllImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllImagesQuery, AllImagesQueryVariables>(AllImagesDocument, options);
      }
export function useAllImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllImagesQuery, AllImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllImagesQuery, AllImagesQueryVariables>(AllImagesDocument, options);
        }
export type AllImagesQueryHookResult = ReturnType<typeof useAllImagesQuery>;
export type AllImagesLazyQueryHookResult = ReturnType<typeof useAllImagesLazyQuery>;
export type AllImagesQueryResult = Apollo.QueryResult<AllImagesQuery, AllImagesQueryVariables>;
export const GetMoviesDocument = gql`
    query getMovies($amount: Int!, $offset: Int!) {
  getMovies(amount: $amount, offset: $offset) {
    id
    name
  }
}
    `;

/**
 * __useGetMoviesQuery__
 *
 * To run a query within a React component, call `useGetMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMoviesQuery({
 *   variables: {
 *      amount: // value for 'amount'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMoviesQuery(baseOptions: Apollo.QueryHookOptions<GetMoviesQuery, GetMoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMoviesQuery, GetMoviesQueryVariables>(GetMoviesDocument, options);
      }
export function useGetMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMoviesQuery, GetMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMoviesQuery, GetMoviesQueryVariables>(GetMoviesDocument, options);
        }
export type GetMoviesQueryHookResult = ReturnType<typeof useGetMoviesQuery>;
export type GetMoviesLazyQueryHookResult = ReturnType<typeof useGetMoviesLazyQuery>;
export type GetMoviesQueryResult = Apollo.QueryResult<GetMoviesQuery, GetMoviesQueryVariables>;
export const AllMoviesDocument = gql`
    query allMovies {
  allMovies {
    id
    name
  }
}
    `;

/**
 * __useAllMoviesQuery__
 *
 * To run a query within a React component, call `useAllMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllMoviesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllMoviesQuery(baseOptions?: Apollo.QueryHookOptions<AllMoviesQuery, AllMoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllMoviesQuery, AllMoviesQueryVariables>(AllMoviesDocument, options);
      }
export function useAllMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllMoviesQuery, AllMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllMoviesQuery, AllMoviesQueryVariables>(AllMoviesDocument, options);
        }
export type AllMoviesQueryHookResult = ReturnType<typeof useAllMoviesQuery>;
export type AllMoviesLazyQueryHookResult = ReturnType<typeof useAllMoviesLazyQuery>;
export type AllMoviesQueryResult = Apollo.QueryResult<AllMoviesQuery, AllMoviesQueryVariables>;