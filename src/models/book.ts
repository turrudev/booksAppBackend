import mongoose, {Schema, Document} from 'mongoose';
import {IAuthor} from './author';

const validateISBN = (isbn: string): boolean => {
    return /^\d{13}$/.test(isbn);
};

const validatePrice = (price: number): boolean => {
    return price > 0;
};

const BookSchema: Schema = new Schema({
    title: {type: String, required: true},
    authors: [{type: Schema.Types.ObjectId, ref: 'Author', required: true}],
    ISBN: {
        type: String,
        required: true,
        validate: {
            validator: validateISBN,
            message: 'Invalid ISBN format. Must be a 13-digit number.'
        }
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: validatePrice,
            message: 'Price must be a positive number.'
        }
    }
}) as Schema;

export interface IBook extends Document {
    title: string;
    authors: Array<IAuthor['_id']>;
    ISBN: string;
    price: number;
}

export default mongoose.model<IBook, mongoose.Model<IBook>>('Book', BookSchema);
