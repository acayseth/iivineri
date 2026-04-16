import redisDriver from "unstorage/drivers/redis";

export default (opts) => redisDriver({ ...opts, url: process.env.REDIS_URL });
