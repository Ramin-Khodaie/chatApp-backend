
import { ClientCommandOptions } from '@redis/client/dist/lib/client';
import { CommandOptions } from '@redis/client/dist/lib/command-options';
import { RedisCommandArgument } from '@redis/client/dist/lib/commands';
import * as redis from 'redis';

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
})

redisClient.connect();

export const setJWT = (key: any, value: number | RedisCommandArgument) => {
    return new Promise(async (resolve, reject) => {
        try {
            redisClient.set(key, value).then(res => resolve(res)).catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}


export const getJWT = (key: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            redisClient.get(key).then((res) => resolve(res)).catch((err) => reject(err));
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteJWT = (key: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            await redisClient.del(key).then((res) => resolve(res)).catch((err) => (reject(err)));
        } catch (error) {
            reject(error)
        }
    })
}



