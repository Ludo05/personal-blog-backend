import config from 'config';
import {NextFunction, Response} from 'express';
import jwt from 'jsonwebtoken';

export interface DecodedToken {
    username: string;
    email?: string;
}

export class AuthService {
    public static checkAuthorization(req: any, res: Response, next: NextFunction) {
        const token: string = req.headers['x-access-token'];
        if (!token) {
            res.status(401).send('You are not authorised')
        }
        jwt.verify(token, 'testprivatekey', (err, user) => {
            if (err) {
                return res.status(403).json('Token is not valid')
            }
            req.user = user;
            return next();
        });
    }
}
