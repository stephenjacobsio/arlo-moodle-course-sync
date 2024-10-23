import express from 'express'; // Update to default import
import config from '../../src/config/config';

jest.mock('express', () => {
  const mockRouter = {
    post: jest.fn(),
  };
  const mockApp = {
    use: jest.fn(),
    listen: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
  };
  const express = jest.fn(() => mockApp); // Mocking express() as a function
  (express as any).Router = jest.fn(() => mockRouter); // Mocking express.Router as a function returning mockRouter
  (express as any).json = jest.fn(); // Mocking express.json as a function
  return express;
});

describe('App Initialization and Routes', () => {
  let mockApp: ReturnType<typeof express>;
  let mockListen: jest.Mock;

  beforeEach(() => {
    mockApp = express(); // Mocked express instance
    mockListen = mockApp.listen as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start the server if not in test environment', () => {
    process.env.NODE_ENV = 'development';
    require('../../src/app');
    expect(mockListen).toHaveBeenCalled();
  });

  it('should not start the server if in test environment', () => {
    process.env.NODE_ENV = 'test';
    require('../../src/app');
    expect(mockListen).not.toHaveBeenCalled();
  });
});
