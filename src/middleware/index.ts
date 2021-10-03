import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface DecodedToken {
    username: string;
    email?: string;
}

export class AuthService {
    public static checkAuthorization(req: any, res: Response, next: NextFunction) {
        try {
            const token: string = req.headers['x-access-token'];
            if(!token) {
                res.status(400).send('Token is needed')
            }
            const decodeToken: object | string = jwt.verify(token, 'testprivatekey');
            const username: any = (decodeToken as DecodedToken).username;
            if (!username) {
                return res.send({
                    status: 'Error',
                    message: 'Invalid user ID'
                });
            } else {
                req.user = username;
                return next();
            }
        } catch {
            return res.status(401).json({
                status: 'Error',
                message: 'Invalid response or token expiration'
            });
        }
    }
}
