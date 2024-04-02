import express from 'express';
import {createBook, getBooks, getBookByISBN, updateBook, deleteBook} from './booksCrud/booksCrud';

const booksRoutes = express.Router();

booksRoutes.post('/', createBook);
booksRoutes.get('/', getBooks);
booksRoutes.get('/:isbn', getBookByISBN);
booksRoutes.patch('/:isbn', updateBook);
booksRoutes.delete('/:isbn', deleteBook);

export default booksRoutes;
