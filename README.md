# Arlo Moodle Course Sync

This project provides an integration between Arlo and Moodle, allowing for the automatic creation of Moodle courses via webhook notifications from Arlo. It uses Express, Axios, and Winston for logging, and is fully written in TypeScript.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup and Installation](#setup-and-installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Receives webhook notifications from Arlo
- Verifies webhook signatures using HMAC-SHA256
- Creates courses in Moodle using the Moodle REST API
- Logs events and errors using Winston
- Provides detailed test coverage with Jest

## Requirements

- Node.js (>= 14.x)
- NPM (>= 6.x)
- TypeScript
- Moodle API Access
- Arlo API Access

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/arlo-moodle-course-sync.git
cd arlo-moodle-course-sync
```

2. Install dependencies

`npm install`

3. Setup environment variables

Create a .env file at the root of the project with the following variables:

```
MOODLE_API_TOKEN=your_moodle_api_token
MOODLE_API_URL=your_moodle_api_url
ARLO_API_KEY=your_arlo_api_key
LOG_LEVEL=info
```

4. Build the project

npm run build

### Configuration

All configuration is managed via the config.ts file and .env variables. Ensure that you have set the correct API keys for Moodle and Arlo.

   •  Moodle: Ensure you have API access with the necessary permissions to create courses.
   •  Arlo: Configure Arlo to send webhook notifications to the Express API.

Running the Application

Once everything is set up, run the application using:

`npm start`

The application listens for webhook notifications at /api/webhook. The server runs on port 3000 by default but can be configured in app.ts.

Testing

The project uses Jest for unit and integration tests. To run the tests:

`npm test`

To generate a coverage report:

`npm test -- --coverage`

## Current Test Coverage

   •  The project has achieved over 80% test coverage across all files.
   •  Integration and unit tests ensure that webhook handling, API calls, and logging functionality work correctly.

### Example failing test cases:

   •  auth.test.ts: Tests fail due to missing environment variables (ARLO_API_KEY).
   •  httpClient.test.ts: Error handling tests fail because the logger does not receive the correct error object.
   •  arloIntegration.test.ts: Integration tests fail due to mismatched status codes and response structures.

### Fixing Test Issues:

Ensure environment variables are properly set in the testing environment, and ensure that error handling and mock responses are consistent across tests.

Project Structure

```
├── src
│   ├── config
│   │   └── config.ts           # Configuration settings
│   ├── controllers
│   │   └── arloController.ts    # Webhook handling logic
│   ├── routes
│   │   └── arloRoutes.ts        # Route definitions
│   ├── services
│   │   └── moodleService.ts     # Moodle API service
│   ├── utils
│   │   ├── auth.ts              # Signature verification
│   │   ├── httpClient.ts        # HTTP client for API requests
│   │   └── logger.ts            # Logger setup using Winston
├── tests
│   ├── integration
│   │   └── arloIntegration.test.ts   # Integration tests
│   ├── unit
│   │   ├── arloController.test.ts    # Unit tests for the controller
│   │   ├── moodleService.test.ts     # Unit tests for the service
│   │   ├── auth.test.ts              # Unit tests for signature verification
│   │   └── httpClient.test.ts        # Unit tests for HTTP client
├── .env                         # Environment variables
├── .gitignore
├── jest.config.js               # Jest configuration
├── tsconfig.json                # TypeScript configuration
└── package.json
```

## Contributing

Contributions are welcome! Please follow these guidelines to contribute:

   1. Fork the repository.
   2. Create a feature branch: git checkout -b feature-name.
   3. Commit your changes: git commit -m 'Add some feature'.
   4. Push to the branch: git push origin feature-name.
   5. Open a pull request.

Please ensure that your changes pass all tests and maintain or improve test coverage.