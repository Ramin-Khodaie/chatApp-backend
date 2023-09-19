import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const encryptedPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve(bcrypt.hash(password, saltRounds))
    })
}



export const createAccessToken = (email: string):Promise<string> => {

    const accessToken = jwt.sign({ email }, "igjtnenx,mdslsfjgeitslkd", {
        expiresIn: '2h'
    })    
    return Promise.resolve(accessToken)
}