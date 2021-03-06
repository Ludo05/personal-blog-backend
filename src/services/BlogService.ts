import { Request, Response } from "express";
import { DELETE_SUCCESSFUL_MESSAGE, RESOURCE_NOT_FOUND_MESSAGE, WELCOME_MESSAGE } from "../constants/messages";
import { BlogModel } from "../models/BlogSchema";
import { blogValidation } from "../validation";
import {redisStore} from "../app";


export class BlogService {
    public getBlogById(req: Request, res: Response) {
        const exampleItemId: string = req.params.id;
        BlogModel.findById(exampleItemId, (error: Error, ItemById: any) => {
            if (error) {
                return  res.send(error);
            }
            return res.status(200).json(ItemById)
        });
    }

    public testAuth(req: Request, res: Response) {
            // @ts-ignore
        return res.json(`Welcome to auth ${req.user.username}!`);
    }

    public getAllExampleItems(req: Request, res: Response) {
        BlogModel.find({}, (error: Error, exampleItem: any) => {
            if (error) {
                return res.send(error);
            }
            return res.json(exampleItem);
        });
    }

    public addNewExampleItem(req: Request, res: Response) {
        const { error, value } = blogValidation.validate(req.body)
        if(error) {
            return res.status(400).send(error)
        }
        const newExampleItem = new BlogModel(value);
        newExampleItem.save((error: Error, exampleItem: any) => {
            if (error) {
                return res.send(error);
            }
            return res.status(201).json(exampleItem);
        });
    }

    public deleteExampleItem(req: Request, res: Response) {
        const exampleItemId = req.params.id;
        //findOneAndDelete({_id: exampleItemId}).
        BlogModel.findByIdAndDelete(exampleItemId, null,(error: any, deleted: any) => {
            if (error) {
                res.send(error);
            }


            return deleted
                ? res.status(204).send(DELETE_SUCCESSFUL_MESSAGE)
                : res.status(404).send(RESOURCE_NOT_FOUND_MESSAGE);
        });
    }

    public updateExampleItem(req: Request, res: Response) {
        const exampleItemId = req.params.id;
        BlogModel.findByIdAndUpdate(
            exampleItemId,
            req.body,
            { new: true }, //Return the updated object
            (error: any, exampleItem: any) => {
                if (error) {
                    res.send(error);
                } else {

                }

                return exampleItem
                    ? res.status(200).json(exampleItem)
                    : res.status(404).send(RESOURCE_NOT_FOUND_MESSAGE);
            }
        );
    }


    public   welcomeMessage(req: Request, res: Response) {
         redisStore.set('one','tester to see if value was saved')
        redisStore.get('one', (err: Error, reply: any) => {
             return res.json(reply)
        })

    }

}
