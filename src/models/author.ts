import mongoose, {Document, Schema} from 'mongoose';

export interface IAuthor extends Document {
    name: string;
}

const AuthorSchema: Schema = new Schema({
    name: {type: String, required: true}
}) as Schema;

export default mongoose.model<IAuthor, mongoose.Model<IAuthor>>('Author', AuthorSchema);