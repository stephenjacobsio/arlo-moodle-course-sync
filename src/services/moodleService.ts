import Logger from '../utils/logger';

/**
 * Processes the Arlo webhook payload and interacts with Moodle.
 * Depending on the event type, different actions are performed.
 *
 * @param payload - Webhook payload from Arlo containing events
 * @returns A promise that resolves when all events are processed
 */
export const processWebhookPayload = async (payload: any): Promise<void> => {
  const events = payload.events;
  for (const event of events) {
    Logger.info(`Processing event: ${event.type} for resource ${event.resourceId}`);
    switch (event.type) {
      case 'Contact.Updated':
        await handleContactUpdated(event.resourceId);
        break;
      case 'Registration.Created':
        await handleRegistrationCreated(event.resourceId);
        break;
      default:
        Logger.warn(`Event type ${event.type} not handled`);
    }
  }
};

/**
 * Handles the Contact.Updated event.
 *
 * @param resourceId - The ID of the updated contact
 */
const handleContactUpdated = async (resourceId: string): Promise<void> => {
  // Fetch contact details and sync with Moodle
  Logger.info(`Processing contact update for ${resourceId}`);
};

/**
 * Handles the Registration.Created event.
 *
 * @param resourceId - The ID of the created registration
 */
const handleRegistrationCreated = async (resourceId: string): Promise<void> => {
  // Fetch registration details and sync with Moodle
  Logger.info(`Processing registration creation for ${resourceId}`);
};
