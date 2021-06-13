import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Image {
    name: String!
  }

  type Query {
    allImages: [Image]
    getImages(page: Int!): [Image]
  }
`;
