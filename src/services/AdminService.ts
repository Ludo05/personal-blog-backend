import { Request, Response } from "express";
import { MongooseDocument } from "mongoose";
import { SchemaModel } from "../models/UserSchema";
import { userValidation } from "../validation";


export class AdminService {
    public SignIn(req: Request, res: Response) {
        const { value , error } = userValidation.validate(req.body);
        if (error) {
            return res.status(400).send(error)
        }
        const newUser = new SchemaModel(value)
        newUser.save((error: Error, mongoUser: MongooseDocument) => {
            if(error) {
                return res.status(400).send(error)
            }
            return res.status(201).json({success: 'User story'})
        })


    }

}
