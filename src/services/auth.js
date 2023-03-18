import { createAxios } from '../config/axios';
import Cookies from 'js-cookie';
import axios from 'axios';
import env from '../config/environment';

export async function signIn({ email, password }) {
  try {
    const resp = await createAxios({ token: getAuthToken() }).post('/sign-in', {
      email,
      password,
    });
    return {
      success: true,
      data: resp.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.response.data.message,
    };
  }
}
export async function signUp({ email, password }) {
  try {
    const resp = await axios.create({
      baseURL: env.api_endpoint,
    }).post('/sign-up', {
      email,
      password,
    });
    return {
      success: true,
      data: resp.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.response.data.message,
    };
  }
}

export function setAuthToken(token) {
  Cookies.set('nimble-crawler-token', token);
  return token;
}

export function getAuthToken() {
  return Cookies.get('nimble-crawler-token');
}

export function clearAuthToken() {
  Cookies.remove('nimble-crawler-token');
}
