import swaggerUi from "swagger-ui-express";
import type { Express, Request, Response } from "express";
import fs from 'fs';
import path from 'path';

const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve('./src/shared/config/swagger-output.json'), 'utf8'));

export function setupSwagger(app: Express) {
  // Serve the Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Serve the Swagger JSON specification
  app.get("/api-docs.json", (req: Request, res: Response) => {
    res.json(swaggerDocument);
  });

  console.log(
    `Docs available at http://localhost:${process.env.PORT || 4000}/api-docs`,
  );
}
