import axios from 'axios';
import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, `./.env`) });

const IS_PROD = process.env.NODE_ENV === `production`;

export const browserClient = axios.create({
  baseURL: IS_PROD
    ? `http://${process.env.PROD_URL}`
    : `http://${process.env.DEV_URL}`,
});
