import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
            if (err) {
                return res.status(401).send('Unauthorized');
            }
            req.body.userId = (decoded as any).id;
            next();
        });
    } else {
        return res.status(401).send('Unauthorized');
    }
};
