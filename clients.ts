import axios from 'axios';
import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, `./.env`) });

const IS_PROD = process.env.NODE_ENV === `production`;

console.log(IS_PROD);

export const browserClient = axios.create({
  baseURL: IS_PROD ? process.env.PROD_URL : process.env.DEV_URL,
});
