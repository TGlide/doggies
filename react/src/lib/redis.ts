import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://unbiased-quetzal-33842.upstash.io",
  token: process.env.REDIS_TOKEN ?? "",
});
