import user from "./userSchema";
import { IUser } from "./userSchema";



export const userSignUp = ({ userId, avatar, email, userName, phoneNumber, password, confirmPassword }: IUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newUser = new user({ avatar, email, userName, phoneNumber, password, confirmPassword, userId });
            const res = await newUser.save();
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })

}

export const isUserExist = (email: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const existedUser = await user.findOne({ email: email })
            if (existedUser) {

                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const getUserByEmail = (email: string): Promise<IUser> => {
    console.log('before promise')
    return new Promise(async (resolve, reject) => {
        console.log('inside promise')
        try {
            const foundedUser = await user.findOne({ email:email });
            console.log('inside promise', foundedUser)
            if (foundedUser) {
                resolve(foundedUser)
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}