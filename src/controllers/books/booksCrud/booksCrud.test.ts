import app from "../../../index";
import request, {Response} from "supertest";
import Book from "../../../models/book";

const generateRandomISBN = (): string => {
    let isbn = '978';

    for (let i = 0; i < 10; i++) {
        isbn += Math.floor(Math.random() * 10);
    }

    return isbn;
};

describe('Books CRUD Controller', () => {
    let createdBookIds: string[] = [];

    afterAll(async () => {
        for (const bookId of createdBookIds) {
            await Book.findByIdAndDelete(bookId);
        }
    });

    describe('POST /books', () => {
        const validAuthorId = '660bcd300ccc4c51cfad0850',
            badAuthorId = 'bad_author_id';

        it('should return 400 if no authors provided', async () => {
            const response: Response = await request(app)
                .post('/books')
                .send({});

            expect(response.status).toBe(400);
        });

        it('should return 400 if one or more authors do not exist', async () => {
            const response: Response = await request(app)
                .post('/books')
                .send({authors: [badAuthorId]});

            expect(response.status).toBe(400);
        });

        it('should return 201 if book is successfully created', async () => {
            const response: Response = await request(app)
                .post('/books')
                .send({
                    title: 'Testing create book',
                    authors: [validAuthorId],
                    _id: generateRandomISBN(),
                    price: 10.5
                });

            expect(response.status).toBe(201);
            expect(response.body).toBeDefined();
            expect(response.body._id).toBeDefined();
            createdBookIds.push(response.body._id);
        });

        it('should return 400 if book has invalid ISBN', async () => {
            const response: Response = await request(app)
                .post('/books')
                .send({
                    title: 'Testing create book',
                    authors: [validAuthorId],
                    _id: "invalid ISBN",
                    price: 10.5
                });

            expect(response.status).toBe(400);
        });

        it('should return 400 if book has invalid price', async () => {
            const response: Response = await request(app)
                .post('/books')
                .send({
                    title: 'Testing create book',
                    authors: [validAuthorId],
                    _id: "invalid ISBN",
                    price: -100
                });

            expect(response.status).toBe(400);
        });
    });
});
