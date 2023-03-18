import { createAxios } from '../config/axios';
import { getAuthToken } from './auth';

export async function uploadReport(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const resp = await createAxios({ token: getAuthToken() }).post('/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
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
      error: error.response.data.errors.message,
    };
  }
}
