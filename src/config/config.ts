import dotenv from 'dotenv';
import Logger from '../utils/logger';

dotenv.config();

/**
 * Loads configuration settings from environment variables for the Moodle API.
 * Provides defaults where necessary.
 */
const config = {
  moodle: {
    apiUrl: process.env.MOODLE_API_URL || '',
    apiToken: process.env.MOODLE_API_TOKEN || '',
    wsFunction: process.env.MOODLE_WS_FUNCTION || '',
    wsFormat: process.env.MOODLE_WS_FORMAT || 'json',
    apiPath: process.env.MOODLE_API_PATH || '/webservice/rest/server.php',
  },
  port: process.env.PORT || 3000,
};

export default config;

Logger.info('Configuration loaded', { config });
