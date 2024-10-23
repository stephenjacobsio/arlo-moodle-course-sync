import axios from 'axios';
import Logger from './logger';

/**
 * Makes an HTTP POST request to the specified URL and logs any errors that occur.
 *
 * @param url - The URL to send the POST request to
 * @param data - The data to send in the request body
 * @returns A promise that resolves with the response data
 * @throws Will throw an error if the request fails
 */
export const postRequest = async (url: string, data: any): Promise<any> => {
  try {
    Logger.info(`Sending POST request to ${url}`);
    const response = await axios.post(url, data);
    Logger.info(`POST request to ${url} successful`);
    return response.data;
  } catch (error) {
    Logger.error('HTTP POST request failed', { url, error });
    throw error;
  }
};
