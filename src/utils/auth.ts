import crypto from 'crypto';
import Logger from './logger';

/**
 * Validates the HMAC-SHA512 signature of the incoming webhook request.
 * Ensures that the request was sent from Arlo by comparing the signature with a computed one.
 *
 * @param payload - The body of the webhook request as a string
 * @param signature - The X-Arlo-Signature header value
 * @param secretKey - The secret key used to sign the payload
 * @returns Boolean indicating whether the signature is valid
 */
export const validateArloSignature = (
  payload: string,
  signature: string,
  secretKey: string
): boolean => {
  Logger.info('Validating Arlo signature');
  const hmac = crypto.createHmac('sha512', Buffer.from(secretKey, 'base64'));
  hmac.update(payload, 'utf8');
  const computedSignature = hmac.digest('base64');
  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature, 'base64'),
    Buffer.from(computedSignature, 'base64')
  );

  if (isValid) {
    Logger.info('Arlo signature validated successfully');
  } else {
    Logger.warn('Arlo signature validation failed');
  }

  return isValid;
};
