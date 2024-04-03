import {Request, Response} from 'express';
import Author, {IAuthor} from "../../../models/author";

export const getAuthors = async (req: Request, res: Response): Promise<void> => {
    try {
        const authors: IAuthor[] = await Author.find().limit(50) as IAuthor[];
        res.status(200).json(authors);
    } catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).json({message: 'Error fetching authors'});
    }
};
