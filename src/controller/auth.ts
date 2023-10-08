import {
  deleteRefreshToken,
  getUserByEmail,
  getUserById,
  isUserExist,
  userSignUp,
} from "../model/user/userModal";
import { Request, Response } from "express";
import { userSignUpValidation } from "../utils/userValidation";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/jwt";
import { v4 as uuidV4 } from "uuid";
import { encryptedPassword } from "../utils/functions";
import { CustomRequest } from "../utils/authorization";
import { deleteUserId } from "../utils/redis";
import user from "../model/user/userSchema";



// FIXME: clean the code 
export const signup = async (req: Request, res: Response) => {
  const { userName, email, password, confirmPassword, phoneNumber } = req.body;
  const avatar = req.file?.filename;
  const userInfo = { userName, email, password, confirmPassword, phoneNumber };

  try {
    const errors = userSignUpValidation(userInfo);
    if (errors.length > 0) {
      res.status(400).json({ message: "Bad Request", errors: errors });
      return;
    }
    const existedUser = await isUserExist(email);

    if (existedUser) {
      res.status(201).json({
        status: "ok",
        message: "Duplicate_User",
        error: { message: "This email is already existed." },
      });
      return;
    }
    const hashedPassword = await encryptedPassword(password);
    const userId = uuidV4();

    const createdUser = await userSignUp({
      userId,
      userName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      phoneNumber,
      avatar,
    });
    if (createdUser) {
      return res.status(200).json({ status: "ok", message: "New_User", data: {} });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(201).json({
        status: "ok",
        message: "No_User",
        error: { message: "There is no user with this email" },
      });
    }
    const comparedResult = await bcrypt.compare(password, user.password);
    if (!comparedResult) {
      return res.status(201).json({
        status: "ok",
        message: "Password_Does_Not_Matches",
        error: { message: "Entered password dose not match." },
      });
    }
    const accessToken = await createAccessToken(user.email, user._id);
    const refreshToken = await createRefreshToken(user.email, user._id)
    res
      .status(200)
      .json({ status: "ok", message: "Login_Successfully", accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const logout = async (req: any, res: Response) => {
  const token = req.headers.authorization?.replace(/^Bearer\s/, '');

  const userId = req.userId;

  deleteUserId(token);

  await deleteRefreshToken(userId as string, "");
  res.status(200).json({ message: 'logged out successfully' })
}


export const getUser = async (req: Request, res: Response) => {
  const userId = (req as CustomRequest).userId;

  const user = await getUserById(userId);
  if (!user) {
    res.status(403).json({ message: 'user not found', })
  }
  res.status(200).json({ message: 'success', data: user })
}