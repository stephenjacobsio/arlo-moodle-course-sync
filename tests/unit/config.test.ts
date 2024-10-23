import config from '../../src/config/config';

describe('Config Module', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears the require cache so that the config is reloaded
    process.env = { ...OLD_ENV }; // Make a copy of the old environment variables
  });

  afterEach(() => {
    process.env = OLD_ENV; // Restore the environment variables to their original state
  });

  it('should load configuration with default values when env variables are missing', () => {
    // Mock missing environment variables
    delete process.env.MOODLE_API_URL;
    delete process.env.MOODLE_API_TOKEN;
    delete process.env.MOODLE_WS_FUNCTION;

    // Reload the config after modifying environment variables
    const config = require('../../src/config/config').default;

    expect(config).toEqual({
      moodle: {
        apiUrl: '',
        apiToken: '',
        wsFunction: '',
        wsFormat: 'json',
        apiPath: '/webservice/rest/server.php',
      },
      port: 3000, // Default value
    });
  });

  it('should load configuration from environment variables', () => {
    // Mock environment variables
    process.env.MOODLE_API_URL = 'http://example.com';
    process.env.MOODLE_API_TOKEN = 'token';
    process.env.MOODLE_WS_FUNCTION = 'core_course_create_courses';
    process.env.PORT = '4000';

    // Reload the config after modifying environment variables
    const config = require('../../src/config/config').default;

    expect(config).toEqual({
      moodle: {
        apiUrl: 'http://example.com',
        apiToken: 'token',
        wsFunction: 'core_course_create_courses',
        wsFormat: 'json',
        apiPath: '/webservice/rest/server.php',
      },
      port: '4000',
    });
  });
});
