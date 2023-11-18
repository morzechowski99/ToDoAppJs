import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'ToDo API',
      version: '0.1.0',
      description: 'Sample api to todos',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:2137',
      },
    ],
  },
  apis: ['**/*.ts'],
};

const specs = swaggerJsdoc(options);
export const setupSwagger = (app: Express) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true }),
  );
};
