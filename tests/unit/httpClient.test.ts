import axios from 'axios';
import { postRequest } from '../../src/utils/httpClient';
import Logger from '../../src/utils/logger';

jest.mock('axios');
jest.mock('../../src/utils/logger');

describe('HTTP Client', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return data on successful POST request', async () => {
    const mockData = { success: true };
    (axios.post as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await postRequest('http://example.com', {});

    expect(result).toEqual(mockData);
  });

  it('should log error and throw on failed POST request', async () => {
    const errorMessage = 'Network Error';
    (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));
    const logSpy = jest.spyOn(Logger, 'error');

    await expect(postRequest('http://example.com', {})).rejects.toThrow(errorMessage);
    expect(logSpy).toHaveBeenCalledWith('HTTP POST request failed', {
      url: 'http://example.com',
      error: expect.any(Error),
    });
  });
});
