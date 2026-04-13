import "dotenv/config";
import express, { type Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./shared/db/dbConnection.js";
import todoRoutes from "./features/todo/todo.routes.js";
import rootNodeRoutes from "./features/task-manager/rootNodes/root.node.route.js";
import riskNodeRoutes from "./features/task-manager/riskNodes/risk.node.route.js";
import controlNodeRoutes from "./features/task-manager/controlNodes/control.node.route.js";
import { setupSwagger } from "./shared/config/swagger.js";
import { connectToRedis } from "./shared/db/redisConnection.js";

async function start() {
  await connectToDatabase();
  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(cors());
  app.use(express.json());

  app.use("/api/todos", todoRoutes);
  app.use("/api/root-nodes", rootNodeRoutes);
  app.use("/api/risk-nodes", riskNodeRoutes);
  app.use("/api/control-nodes", controlNodeRoutes);

  setupSwagger(app);
  await connectToRedis();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
