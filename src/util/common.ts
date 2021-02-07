import axios from 'axios';

/**
 * Common function to make rest call
 * @param url
 * @param headers
 * @param body
 */
export async function callPostWS(url: string, headers: any, body: any) {
  try {
    const response = await axios.post(url, body, headers);
    if (response && response.data) {
      return response.data;
    }
    return response;
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Unable to reach the service');
    }
    if (error.response && error.response.data) {
      return error.response.data;
    } else return error;
  }
}
