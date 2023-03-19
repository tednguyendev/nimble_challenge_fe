import { createAxios } from '../config/axios';
import { getAuthToken } from './auth';

export async function getScrapedPage(keywordId, keyword) {
  try {
    const resp = await createAxios({ token: getAuthToken() }).get('/keywords/' + keywordId + '/html-source');
    const url = window.URL.createObjectURL(new Blob([resp.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', keyword + '.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}