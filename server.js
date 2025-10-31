const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const port = 9000;

// Swagger Options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to route documentation
};

// Initialize Swagger Docs
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middlewares
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello from the API!');
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
  console.log(`✅ Swagger Docs available at http://localhost:${port}/api-docs`);
});
