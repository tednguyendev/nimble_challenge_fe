import axios from 'axios';
import env from '../config/environment';

export function createAxios({ token }) {
  const headers = {};
  if (token) {
    headers['Authorization'] = token;
  }
  return axios.create({
    baseURL: env.api_endpoint,
    timeout: 5 * 60 * 1000,
    headers: headers,
  });
}
