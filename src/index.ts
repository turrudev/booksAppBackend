import express, {Request, Response} from 'express';

const app = express(), port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default server;
