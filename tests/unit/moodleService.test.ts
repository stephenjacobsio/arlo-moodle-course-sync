import { processWebhookPayload } from '../../src/services/moodleService';
import Logger from '../../src/utils/logger';

jest.mock('../../src/utils/logger');

describe('Moodle Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should process Contact.Updated event', async () => {
    const payload = {
      events: [{ type: 'Contact.Updated', resourceId: '123' }],
    };

    const logSpy = jest.spyOn(Logger, 'info');

    await processWebhookPayload(payload);

    expect(logSpy).toHaveBeenCalledWith('Processing event: Contact.Updated for resource 123');
  });

  it('should process Registration.Created event', async () => {
    const payload = {
      events: [{ type: 'Registration.Created', resourceId: '456' }],
    };

    const logSpy = jest.spyOn(Logger, 'info');

    await processWebhookPayload(payload);

    expect(logSpy).toHaveBeenCalledWith('Processing event: Registration.Created for resource 456');
  });

  it('should log warning for unhandled event types', async () => {
    const payload = {
      events: [{ type: 'Unknown.Event', resourceId: '789' }],
    };

    const logSpy = jest.spyOn(Logger, 'warn');

    await processWebhookPayload(payload);

    expect(logSpy).toHaveBeenCalledWith('Event type Unknown.Event not handled');
  });
});
