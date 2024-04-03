import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authorsRoutes from "./controllers/authors/authorsRoutes";
import getEnv from "./utils/getEnv";
import booksRoutes from "./controllers/books/booksRoutes";
import testsRunning from "./utils/testsRunning";
import path from "path";
import cors from "cors";

dotenv.config({path: getEnv()});

(async () => {
    await mongoose.connect(process.env.MONGODB_URI!, {});
})();

const app = express(), port = 3000;

app.use(cors({origin: /^http:\/\/localhost:\d+$/,}));
app.use(express.json());
app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'redoc-static.html'));
});

if (!testsRunning()) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

export default app;
