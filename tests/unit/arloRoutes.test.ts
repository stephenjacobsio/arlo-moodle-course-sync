import request from 'supertest';
import app from '../../src/app';
import Logger from '../../src/utils/logger';
import arloController from '../../src/controllers/arloController';
import { validateArloSignature } from '../../src/utils/auth';
import { processWebhookPayload } from '../../src/services/moodleService';

jest.mock('../../src/utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('../../src/utils/auth');
jest.mock('../../src/services/moodleService');

describe('Arlo Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should route POST /webhook and return 200 OK for valid requests', async () => {
    (validateArloSignature as jest.Mock).mockReturnValue(true); // Simulate valid signature
    (processWebhookPayload as jest.Mock).mockResolvedValueOnce({}); // Simulate successful payload processing

    const response = await request(app)
      .post('/webhook')
      .send({ events: ['event1', 'event2'] });

    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
    expect(Logger.info).toHaveBeenCalledWith('Webhook processed successfully');
  });

  it('should return 403 when signature is invalid for POST /webhook', async () => {
    (validateArloSignature as jest.Mock).mockReturnValue(false); // Simulate invalid signature

    const response = await request(app).post('/webhook').send({ events: [] });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: 'Invalid signature' });
    expect(Logger.error).toHaveBeenCalledWith('Invalid signature');
  });

  it('should return 500 if there is an error during webhook processing', async () => {
    (validateArloSignature as jest.Mock).mockReturnValue(true); // Valid signature
    (processWebhookPayload as jest.Mock).mockRejectedValueOnce(new Error('Processing failed')); // Simulate failure

    const response = await request(app)
      .post('/webhook')
      .send({ events: ['event1', 'event2'] });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
    expect(Logger.error).toHaveBeenCalledWith('Webhook processing failed', expect.anything());
  });
});
