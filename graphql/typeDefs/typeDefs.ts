import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Image {
    name: String!
  }

  type Movie {
    id: String!
    name: String!
  }

  type Query {
    allImages: [Image]
    getImages(page: Int!): [Image]

    allMovies: [Movie]
    getMovies(amount: Int!, offset: Int!): [Movie]
  }
`;
