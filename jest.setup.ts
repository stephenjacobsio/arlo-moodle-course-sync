import dotenv from 'dotenv';

require('dotenv').config({ path: '.env.test' });

// Set NODE_ENV to 'test' for Jest tests
process.env.NODE_ENV = 'test';