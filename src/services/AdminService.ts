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

        const newUser = new SchemaModel(req.body)
        newUser.save((error: Error, mongoUser: MongooseDocument) => {
            if (error) {
                return res.status(400).send(error)
            }
            return res.status(201).json({mongoUser})
        })
    }

    public async login(req: Request, res: Response) {
        const {value, error} = loginValidation.validate(req.body);
        if (error) {
            return res.status(422).send(error)
        }
        const user = await SchemaModel.findOne({username: value.username}).exec();

        const decodedPassword = await bcrypt.compare(req.body.password, user.password)
        console.log(decodedPassword)
        if (!decodedPassword) {
            // Should return a error saying the username and password doesnt match.
            return res.status(300).send({msg: 'User creds are incorrect please try again.'});
        }
        const token: string = jwt.sign({username: value.username},'testprivatekey', {
            expiresIn: 300 * jwtExpirySeconds
        });

        res.cookie('token', token, {maxAge: (jwtExpirySeconds * 600000) * 600});
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
