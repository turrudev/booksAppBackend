import mongoose from 'mongoose';
import Author, {IAuthor} from "./src/models/author";
import Book, {IBook} from "./src/models/book";
import dotenv from 'dotenv';
import getEnv from "./src/utils/getEnv";

dotenv.config({path: getEnv()});

const mongoURI: string = process.env.MONGODB_URI || '';

async function seedDatabase(): Promise<void> {
    try {
        await mongoose.connect(mongoURI, {});

        const existingAuthorsCount = await Author.countDocuments();

        if (existingAuthorsCount === 0) {
            const authorsData: Partial<IAuthor>[] = [
                {name: 'J.K. Rowling'},
                {name: 'Stephen King'},
                {name: 'George R.R. Martin'},
                {name: 'Harper Lee'},
                {name: 'J.R.R. Tolkien'},
                {name: 'Dan Brown'},
                {name: 'Agatha Christie'},
                {name: 'Leo Tolstoy'},
                {name: 'Jane Austen'},
                {name: 'Fyodor Dostoevsky'}
            ];

            const authors = await Author.insertMany(authorsData);

            const booksData: Partial<IBook>[] = [
                {title: 'Harry Potter and the Philosopher\'s Stone', authors: [authors[0]._id], _id: '9780590353427', price: 10.99},
                {title: 'The Shining', authors: [authors[1]._id], _id: '9780307743657', price: 15.99},
                {title: 'A Game of Thrones', authors: [authors[2]._id], _id: '9780553386790', price: 20.99},
                {title: 'To Kill a Mockingbird', authors: [authors[3]._id], _id: '9780061120084', price: 12.99},
                {title: 'The Hobbit', authors: [authors[4]._id], _id: '9780345339683', price: 11.99},
                {title: 'The Da Vinci Code', authors: [authors[5]._id], _id: '9780307474278', price: 14.99},
                {title: 'Murder on the Orient Express', authors: [authors[6]._id], _id: '9780062073495', price: 13.99},
                {title: 'War and Peace', authors: [authors[7]._id], _id: '9781421427000', price: 17.99},
                {title: 'Pride and Prejudice', authors: [authors[8]._id], _id: '9780141439518', price: 9.99},
                {title: 'Crime and Punishment', authors: [authors[9]._id], _id: '9780394601473', price: 16.99}
            ];

            await Book.insertMany(booksData);
            console.log('Books seeded successfully');
        } else {
            console.log('Database already seeded, skipping seeding process');
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();
