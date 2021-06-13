import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Image {
    name: String!
  }

  input ImagePagination {
    page: Int!
  }

  type Query {
    getImages(page: ImagePagination): [Image]
  }
`;
