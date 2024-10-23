import { Request, Response } from 'express';
import { processWebhookPayload } from '../services/moodleService';
import { validateArloSignature } from '../utils/auth';
import Logger from '../utils/logger';

const processWebhook = async (req: Request, res: Response) => {
  try {
    const { events } = req.body;
    const signature = req.headers['x-arlo-signature'];
    const secret = process.env.ARLO_SECRET || ''; // Retrieve the secret

    // Here, you need to stringify the entire request body, not just the events
    if (!validateArloSignature(JSON.stringify(req.body), signature as string, secret)) {
      Logger.error('Invalid signature');
      return res.status(403).json({ error: 'Invalid signature' });
    }

    await processWebhookPayload(events);
    Logger.info('Webhook processed successfully');
    return res.status(200).send('OK');
  } catch (error) {
    Logger.error('Webhook processing failed', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export default { processWebhook };
