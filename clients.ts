import axios from 'axios';

export const browserClient = axios.create({
  baseURL: `http://localhost:49160`,
});
