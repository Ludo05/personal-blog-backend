import {Request, Response} from "express";
import {MongooseDocument} from "mongoose";
import {SchemaModel} from "../models/UserSchema";
import {loginValidation, userValidation} from "../validation";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { array } from '../util/RefreshTokenHolder'

export class AdminService {
    public async register(req: Request, res: Response) {
        const {value, error} = userValidation.validate(req.body);
        if (error) {
            return res.status(400).send(error)
        }

        const newUser = new SchemaModel(value)
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
        if (!decodedPassword) {
            // Should return a error saying the username and password doesnt match.
            return res.status(300).send({msg: 'User creds are incorrect please try again.'});
        }

        const access_token: string = AdminService.generateAccessToken(user)

        const refresh_token: string = AdminService.generateRefreshToken(user)
        array.push(refresh_token)

        return res.json({
            access_token,
            refresh_token,
            username: user.username,
            email: user.email
        });
    }

    public async logout(req: Request, res: Response) {
       const token = req.body.token;
        array.filter(tokens => tokens !== token)
        return res.status(200).json('You have been logged out')
    }

    public refreshToken(req: Request, res: Response) {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json('You need a token for refresh')
        }
        if(!array.includes(token)){
            return res.status(403).json("Refresh token is not valid")
        }

        jwt.verify(token, "testRefreshPrivatekey", (err: any, user: any) => {
            err && console.log(err)
            array.filter(tokens => tokens !== token);

            const access_token: string = AdminService.generateAccessToken(user)
            const refresh_token: string = AdminService.generateRefreshToken(user)

            array.push(refresh_token)

            res.status(200).json({
                access_token: access_token,
                refresh_token: refresh_token
            })
        })
    }

    private static generateAccessToken(user: any) {
        return jwt.sign({username: user.username, email: user.email,}, 'testprivatekey', {
            expiresIn: '15s'
        })
    }

    private static generateRefreshToken(user: any) {
        return jwt.sign({username: user.username, email: user.email}, 'testRefreshPrivatekey')
    }
}
