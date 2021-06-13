"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
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
