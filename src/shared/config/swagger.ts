// src/config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express, Request, Response } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Express TypeScript API",
      version: "1.0.0",
      description: "API documentation for my project",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Looks for annotations in both .ts and compiled .js files
  apis: [
    "./src/features/**/*.route.ts",
    "./src/features/**/*.routes.ts",
    "./src/features/**/*.controller.ts",
    "./dist/features/**/*.route.js",
    "./dist/features/**/*.routes.js",
    "./dist/features/**/*.controller.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  // Serve the Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Serve the Swagger JSON specification (optional, but useful)
  app.get("/api-docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${process.env.PORT || 4000}/api-docs`);
}
