import { validateArloSignature } from '../../src/utils/auth';
import crypto from 'crypto';

jest.mock('crypto');

describe('Auth Utility', () => {
  const payload = '{"events":[{"id":"123","type":"Contact.Updated","resourceId":"456"}]}';
  const secretKey = 'test_secret';
  const signature = 'mock-signature';

  it('should return true for valid signature', () => {
    const hmac = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue(Buffer.from(signature, 'base64')),
    };
    (crypto.createHmac as jest.Mock).mockReturnValue(hmac);
    (crypto.timingSafeEqual as jest.Mock).mockReturnValue(true);

    const result = validateArloSignature(payload, signature, secretKey);

    expect(crypto.createHmac).toHaveBeenCalledWith('sha512', Buffer.from(secretKey, 'base64'));
    expect(result).toBe(true);
  });

  it('should return false for invalid signature', () => {
    const hmac = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue(Buffer.from('invalid-signature', 'base64')),
    };
    (crypto.createHmac as jest.Mock).mockReturnValue(hmac);
    (crypto.timingSafeEqual as jest.Mock).mockReturnValue(false);

    const result = validateArloSignature(payload, signature, secretKey);

    expect(result).toBe(false);
  });
});
