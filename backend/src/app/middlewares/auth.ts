import { Request, Response, NextFunction } from "express";
import { verifyUserToken } from "../auth/utils/token";

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized: Missing or invalid token format" });
        return;
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyUserToken(token as string);

    if (!payload) {
        res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
        return;
    }

    req.user = payload;
    next();
};
