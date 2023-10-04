import jwt from 'jsonwebtoken';
import { setUserId } from './redis';
import { addRefreshToken } from '../model/user/userModal';
import { ObjectId } from 'mongoose';


export const createAccessToken = async (email: string, id: string): Promise<string> => {
    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_KEY as string, {
        expiresIn: '2h'
    })
    await setUserId(accessToken, id)
    return Promise.resolve(accessToken)
}

export const createRefreshToken = async (email: string, id: ObjectId) => {
    try {
        const refreshToken = await jwt.sign({ email }, process.env.REFRESH_TOKEN as string, {
            expiresIn: "30d"
        })

        await addRefreshToken(id, refreshToken);
        return Promise.resolve(refreshToken)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const verifyAccessToken = (token: string) => {
    try {
        return Promise.resolve(jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string))
    } catch (error) {
        return Promise.reject(error)
    }
}