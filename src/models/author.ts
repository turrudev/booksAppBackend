import mongoose, {Schema, Document} from 'mongoose';

export interface IAuthor extends Document {
    name: string;
}

const AuthorSchema: Schema = new Schema({
    name: {type: String, required: true}
});

export default mongoose.model<IAuthor>('Author', AuthorSchema);
