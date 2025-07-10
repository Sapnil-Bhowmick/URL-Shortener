require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const fullHost = process.env.BASE_URL;
const url = new URL(fullHost);

const doc = {
  info: {
    title: 'My API',
    description: 'Documentation for URL-Shortener API Routes'
  },

  // e.g., localhost:3000
  host: `${url.hostname}:${url.port}`,

  // ['http'] or ['https']
  schemes: [url.protocol.replace(':', '')],
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
