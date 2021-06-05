import axios from 'axios';

const IS_PROD = process.env.NODE_ENV === `production`;

export const browserClient = axios.create({
  // baseURL: IS_PROD ? `http://localhost:49160/api` : `http://localhost:8080/api`,
  baseURL: `http://localhost:8080/api`,
});
