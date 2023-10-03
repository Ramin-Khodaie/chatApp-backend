import {
  getUserByEmail,
  isUserExist,
  userSignUp,
} from "../model/user/userModal";
import { Request, Response } from "express";
import { userSignUpValidation } from "../utils/userValidation";
import bcrypt from "bcrypt";
import { createAccessToken, encryptedPassword } from "../utils/functions";
import { v4 as uuidV4 } from "uuid";
import redis from "redis";

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
      confirmPassword,
      phoneNumber,
      avatar,
    });
    if (createdUser) {
      res.status(200).json({ status: "ok", message: "New_User", data: {} });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(201).json({
        status: "ok",
        message: "No_User",
        error: { message: "There is no user with this email" },
      });
      return;
    }
    const comparedPassword = await bcrypt.compare(password, user.password);
    if (comparedPassword) {
      const accessToken = await createAccessToken(email);
      const redisClient = redis.createClient();
      redisClient.set(user.email, accessToken);
      res
        .status(200)
        .json({ status: "ok", message: "Login_Successfully", accessToken });
      return;
    } else {
      res.status(201).json({
        status: "ok",
        message: "Password_Does_Not_Matches",
        error: { message: "Entered password dose not match." },
      });
      return;
    }

    console.log("hahahah");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
