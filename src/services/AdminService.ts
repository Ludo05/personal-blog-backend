import {NextFunction, Request, Response} from "express";
import { MongooseDocument } from "mongoose";
import { SchemaModel } from "../models/UserSchema";
import {loginValidation, userValidation} from "../validation";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const jwtExpirySeconds: number = 90000000;

export class AdminService {
    public async register(req: Request, res: Response) {
        const {value, error} = userValidation.validate(req.body);
        if (error) {
            return res.status(400).send(error)
        }

        const encryptedUser: any = value;
        encryptedUser.password = bcrypt.hashSync(encryptedUser.password, 10);

        const newUser = new SchemaModel(encryptedUser)
        newUser.save((error: Error, mongoUser: MongooseDocument) => {
            if (error) {
                return res.status(400).send(error)
            }
            return res.status(201).json({mongoUser})
        })
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        const {value, error} = loginValidation.validate(req.body);
        if (error) {
            return res.status(422).send(error)
        }
        const user = await SchemaModel.findOne({username: value.username}).exec();
        if (!bcrypt.compareSync(value.password, user.password)) {
            // Should return a error saying the username and password doesnt match.
            return res.status(300).send({msg: 'User creds are incorrect please try again.'});
        }

        const token: string = jwt.sign({username: value.username},'testprivatekey', {
            expiresIn: 300 * jwtExpirySeconds
        });

        res.cookie('token', token, {maxAge: (jwtExpirySeconds * 600000) * 600});
        // @ts-ignore
        req.session.user = user
        return res.json({
            token,
            user: {
                username: user.username,
                lastName: user.lastName,
                email: user.email
            }
        });
    }
}
