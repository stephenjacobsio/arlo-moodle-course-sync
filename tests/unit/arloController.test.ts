import { Request, Response } from 'express';
import arloController from '../../src/controllers/arloController';
import { validateArloSignature } from '../../src/utils/auth';
import { processWebhookPayload } from '../../src/services/moodleService';
import Logger from '../../src/utils/logger';

// Mock the external utilities and services
jest.mock('../../src/utils/auth');
jest.mock('../../src/services/moodleService'); // Mock the actual service call
jest.mock('../../src/utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('Arlo Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    jest.resetAllMocks();

    // Set the secret as an environment variable (if required)
    process.env.ARLO_SECRET = 'mock-secret';

    req = {
      body: { events: ['event1', 'event2'] }, // Correct body structure
      headers: { 'x-arlo-signature': 'mock-signature' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  it('should return 403 if signature is invalid', async () => {
    (validateArloSignature as jest.Mock).mockReturnValue(false); // Simulate invalid signature

    await arloController.processWebhook(req as Request, res as Response);

    expect(validateArloSignature).toHaveBeenCalledWith(
      JSON.stringify(req.body), // Ensure that the body is correctly stringified
      'mock-signature',
      'mock-secret'
    );
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid signature' });
    expect(Logger.error).toHaveBeenCalledWith('Invalid signature');
  });

  it('should return 200 if signature is valid and processing succeeds', async () => {
    (validateArloSignature as jest.Mock).mockReturnValue(true); // Simulate valid signature
    req.body = { events: ['event1', 'event2'] }; // Ensure the body contains valid events

    await arloController.processWebhook(req as Request, res as Response);

    expect(validateArloSignature).toHaveBeenCalledWith(
      JSON.stringify(req.body), // Stringify the entire request body
      'mock-signature',
      'mock-secret'
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('OK');
    expect(Logger.info).toHaveBeenCalledWith('Webhook processed successfully');
  });

  it('should return 500 if processing fails', async () => {
    (validateArloSignature as jest.Mock).mockReturnValue(true); // Valid signature
    (processWebhookPayload as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Processing failed');
    });

    await arloController.processWebhook(req as Request, res as Response);

    expect(validateArloSignature).toHaveBeenCalledWith(
      JSON.stringify(req.body), // Stringify the entire request body
      'mock-signature',
      'mock-secret'
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(Logger.error).toHaveBeenCalledWith('Webhook processing failed', expect.anything());
  });
});
