import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Todo API',
    description: 'API for managing todos and task nodes',
    version: '1.0.0'
  },
  host: 'localhost:4000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/index.ts'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
