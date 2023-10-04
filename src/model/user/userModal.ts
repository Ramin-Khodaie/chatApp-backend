import { ObjectId } from "mongoose";
import user from "./userSchema";
import { IUser } from "./userSchema";



export const userSignUp = ({ userId, avatar, email, userName, phoneNumber, password, confirmPassword }: Pick<IUser, 'userId' | 'avatar' | 'email' | 'userName' | 'phoneNumber' | 'password' | 'confirmPassword'>) => {
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

export const getUserByEmail = (email: string): Promise<IUser | null> => {
    return new Promise(async (resolve, reject) => {
        try {
            const foundedUser = await user.findOne({ email: email });
            if (foundedUser) {
                resolve(foundedUser)
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const addRefreshToken = (_id: ObjectId, token: string) => {
    return new Promise((resolve, reject) => {
        try {
            user.findOneAndUpdate({ _id }, { $set: { "refreshToken.token": token, "refreshToken.createdAt": Date.now() } }, { new: true }).then((res) => {
                resolve(res)
            }).catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}


export const deleteRefreshToken = (_id: string, token: string) => {
    return new Promise((resolve, reject) => {
        try {
            user.findOneAndUpdate(
                { _id },
                {
                    $set: {
                        "refreshToken.token": token,
                        "refreshToken.createdAt": Date.now()
                    }
                },
                { new: true }
            ).
                then((res) => resolve(res))
                .catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}