import * as redis from 'redis';

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
})

redisClient.connect();

export const setUserId = (token: any, userId: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            redisClient.set(token, userId.toString()).then(res => resolve(res)).catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}


export const getUserId = (token: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            redisClient.get(token).then((res) => resolve(res)).catch((err) => reject(err));
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteUserId = (key: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            await redisClient.del(key).then((res) => resolve(res)).catch((err) => (reject(err)));
        } catch (error) {
            reject(error)
        }
    })
}



