import axios from 'axios';
import { request, GraphQLClient } from 'graphql-request';
import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, `./.env`) });

const IS_PROD = process.env.NODE_ENV === `production`;
const endpoint = IS_PROD
  ? `http://${process.env.PROD_URL}`
  : `http://${process.env.DEV_URL}`;

export const browserClient = axios.create({
  baseURL: endpoint,
});

export const nodeGraphQl = new GraphQLClient(`${endpoint}/api/graphql`);
