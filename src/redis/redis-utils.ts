import { Response } from 'express';
import redisClient from './redis-client';

export const saveToRedis = async (key: string, data: any, ttl = 60) => {
  await redisClient.set(key, JSON.stringify(data), {
    EX: ttl,
  });
};

export const cacheResponse = async (res: Response, data: any) => {
  if (res.locals.cacheKey) {
    await saveToRedis(res.locals.cacheKey, data, res.locals.ttl);
  }
};

export const getFromRedis = async (key: string) => {
  const data = await redisClient.get(key);

  if (data) {
    return JSON.parse(data);
  }

  return null;
};
