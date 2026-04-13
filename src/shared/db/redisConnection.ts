import { createClient } from "redis";

const redisURL = process.env.REDIS_URL || "redis://localhost:6379";
export const redisClient = createClient({
  url: redisURL,
});

redisClient.on(`error`, (err) => console.error(`Redis Client Error ${err}`));

export const connectToRedis = async () => {
  try {
    await redisClient.connect();
    console.log(`Redis Connected to: ${redisURL} successfully`);
  } catch (error) {
    console.error(`Redis connection error details: ${error}`);
  }
};
