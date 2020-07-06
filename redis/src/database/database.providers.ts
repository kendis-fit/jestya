import { RedisClient } from "redis"

export const REDIS = "REDIS";

export const databaseProviders = [
    {
        provide: REDIS,
        useFactory: () => {
            const redis = new RedisClient({
                url: ""
            });
            return redis;
        }
    }
]