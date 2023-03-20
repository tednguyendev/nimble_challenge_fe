import { createAxios } from '../config/axios';
import { getAuthToken } from './auth';

export async function uploadReport(file, name) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);

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
      error: error.response.data.message,
    };
  }
}

export async function getReports({ page = 1, perPage = 10, keyword = '', orderBy = '' }) {
  const resp = await createAxios({ token: getAuthToken() }).get('/reports', {
    params: {
      page,
      per_page: perPage,
      keyword,
      order_by: orderBy
    }
  });
  return resp.data.data;
}

export async function getReport(reportId) {
  try {
    const resp = await createAxios({ token: getAuthToken() }).get('/reports/' + reportId);
    return {
      success: true,
      data: resp.data.data,
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

export async function retryReport(reportId) {
  try {
    await createAxios({ token: getAuthToken() }).post('/reports/' + reportId + '/retry');

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response.data.message,
    };
  }
}
