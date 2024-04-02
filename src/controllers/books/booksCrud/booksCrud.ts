import {Request, Response} from 'express';
import Book, {IBook} from "../../../models/book";
import Author from "../../../models/author";

export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.body.authors || req.body.authors.length === 0) {
            res.status(400).send({error: 'At least one author must be provided.'});
            return;
        }

        const authorIds = req.body.authors, authorsExist = await Author.find({_id: {$in: authorIds}});

        if (authorsExist.length !== authorIds.length) {
            res.status(400).send({error: 'One or more authors do not exist.'});
            return;
        }

        const book = new Book(req.body);
        await book.save();

        res.status(201).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    try {
        const books = await Book.find().skip(skip).limit(limit);
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getBookByISBN = async (req: Request, res: Response): Promise<void> => {
    const isbn = req.params.isbn;

    try {
        const book = await Book.findById(isbn);

        if (!book) {
            res.status(404).send();
            return;
        }

        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
    const updates: (keyof IBook)[] = Object.keys(req.body) as (keyof IBook)[],
        allowedUpdates: (keyof IBook)[] = ['title', 'authors', 'price'];

    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'});
        return;
    }

    const isbn = req.params.isbn;

    try {
        const book = await Book.findById(isbn);

        if (!book) {
            res.status(404).send();
            return;
        }

        updates.forEach(update => {
            (book as any)[update] = req.body[update];
        });

        await book.save();

        res.send(book);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    const isbn = req.params.isbn;

    try {
        const book = await Book.findByIdAndDelete(isbn);

        if (!book) {
            res.status(404).send();
            return;
        }

        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
};
