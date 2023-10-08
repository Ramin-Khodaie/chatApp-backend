import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "./jwt";
import { deleteUserId, getUserId } from "./redis";


export interface CustomRequest extends Request {
    userId: string;
}
export const userAutorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace(/^Bearer\s/, '');
        if (!token) {
            return res.status(401).json({ message: 'Invalid token' })
        }
        const decode = await verifyAccessToken(token as string);

        if (decode) {
            const userId = await getUserId(token);
            if (!userId) {
                return res.status(403).json({ message: 'You Need to login first to continue' })
            }
            (req as CustomRequest).userId = userId as string;
            next()
        } else {
            deleteUserId(token);
            return res.status(403).json({ message: 'You Need to login first to continue' })
        }

    } catch (error) {
        res.status(401).json({ message: 'Please authenticate', })
    }

}