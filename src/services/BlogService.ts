import { Request, Response } from "express";
import { DELETE_SUCCESSFUL_MESSAGE, RESOURCE_NOT_FOUND_MESSAGE, WELCOME_MESSAGE } from "../constants/messages";
import { MongooseDocument } from "mongoose";
import { BlogModel } from "../models/BlogSchema";
import { blogValidation } from "../validation";


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

    public getAllExampleItems(req: Request, res: Response) {
        BlogModel.find({}, (error: Error, exampleItem: MongooseDocument) => {
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
        newExampleItem.save((error: Error, exampleItem: MongooseDocument) => {
            if (error) {
                return res.send(error);
            }
            return res.status(201).json(exampleItem);
        });
    }

    public deleteExampleItem(req: Request, res: Response) {
        const exampleItemId = req.params.id;
        //findOneAndDelete({_id: exampleItemId}).
        BlogModel.findByIdAndDelete(exampleItemId, (error: Error, deleted: any) => {
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
            (error: Error, exampleItem: any) => {
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



}
