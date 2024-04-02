import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authorsRoutes from "./controllers/authors/authorsRoutes";
import getEnv from "./utils/getEnv";
import booksRoutes from "./controllers/books/booksRoutes";
import testsRunning from "./utils/testsRunning";

dotenv.config({path: getEnv()});

(async () => {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI!, {});
})();

const app = express(), port = 3000;

app.use(express.json());

app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

if (!testsRunning()) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

export default app;
