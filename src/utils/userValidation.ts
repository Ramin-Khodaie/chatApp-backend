import validator from 'validator'
import { IUser } from '../model/user/userSchema';


const erros: string[] = [];

export const userSignUpValidation = (fields: Pick<IUser, 'userName' | 'email' | 'password' | 'confirmPassword' | 'phoneNumber'>) => {

    const { userName, email, password, confirmPassword, phoneNumber } = fields;

    if (!userName) {
        erros.push('Please provide your usename')
    }
    if (!email) {
        erros.push('Please provide your email')
    }
    if (email && !validator.isEmail(email.toString())) {
        erros.push('Please provide your valid email')
    }
    if (!phoneNumber) {
        erros.push('Please provide your phonenumber')
    }
    if (!confirmPassword) {
        erros.push('Please provide your confirm password')
    }
    if (password && confirmPassword && password !== confirmPassword) {
        erros.push('your password and confirm password not match')
    }

    return erros;
}