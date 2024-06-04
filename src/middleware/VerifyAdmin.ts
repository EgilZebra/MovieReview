import jwt from "jsonwebtoken";
import {  NextFunction, Request, Response } from 'express';
import { jwtPayload } from '../models/types/types';

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.headers['authorization']) { return res.status(400).send('Access Unauthorized!') };
    const token: string = req.headers['authorization'].replace('Bearer ', '');
    jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded: any) => {
        if (err) {
            return res.status(400).send('Access Unauthorized!');
        }
        const decodedToken: jwtPayload = decoded as jwtPayload;
        if (decodedToken.role === 'admin') {
            return next();
        } else {
            return res.status(400).send('Access Unauthorized!');
        }
    });
};