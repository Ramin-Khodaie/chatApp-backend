import bcrypt from 'bcrypt';


const saltRounds = 10;

export const encryptedPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve(bcrypt.hash(password, saltRounds))
    })
}



