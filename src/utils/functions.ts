import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { setJWT } from './redis';

const saltRounds = 10;

export const encryptedPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve(bcrypt.hash(password, saltRounds))
    })
}



export const createAccessToken = async (email: string, id: string): Promise<string> => {
    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_KEY as string, {
        expiresIn: '2h'
    })
    await setJWT(accessToken, id)
    return Promise.resolve(accessToken)
}