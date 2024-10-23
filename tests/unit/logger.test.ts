import Logger from '../../src/utils/logger';

describe('Logger Utility', () => {
  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it('should log info messages correctly', () => {
    const spy = jest.spyOn(Logger, 'info');

    // Act
    Logger.info('Test info message');

    // Assert
    expect(spy).toHaveBeenCalledWith('Test info message');
  });

  it('should log error messages correctly', () => {
    const spy = jest.spyOn(Logger, 'error');

    // Act
    const error = new Error('Test error');
    Logger.error('Test error message', error);

    // Assert
    expect(spy).toHaveBeenCalledWith('Test error message', error);
  });

  it('should log warn messages correctly', () => {
    const spy = jest.spyOn(Logger, 'warn');

    // Act
    Logger.warn('Test warn message');

    // Assert
    expect(spy).toHaveBeenCalledWith('Test warn message');
  });

  it('should log debug messages correctly', () => {
    const spy = jest.spyOn(Logger, 'debug');

    // Act
    Logger.debug('Test debug message');

    // Assert
    expect(spy).toHaveBeenCalledWith('Test debug message');
  });

  it('should log in production mode', () => {
    process.env.NODE_ENV = 'production';
    const spy = jest.spyOn(Logger, 'info');

    // Act
    Logger.info('Production mode log');

    // Assert
    expect(spy).toHaveBeenCalledWith('Production mode log');
  });

  it('should log in development mode', () => {
    process.env.NODE_ENV = 'development';
    const spy = jest.spyOn(Logger, 'debug');

    // Act
    Logger.debug('Development mode log');

    // Assert
    expect(spy).toHaveBeenCalledWith('Development mode log');
  });

  it('should log error with stack trace', () => {
    const spy = jest.spyOn(Logger, 'error');

    // Act
    const error = new Error('Stack trace error');
    Logger.error('Test error with stack', error);

    // Assert
    expect(spy).toHaveBeenCalledWith('Test error with stack', error);
    expect(spy.mock.calls[0][1].stack).toBeTruthy(); // Ensure that the stack trace is included
  });
});
