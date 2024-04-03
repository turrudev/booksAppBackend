import request from 'supertest';
import app from "../../../index";

describe('GET /authors/', () => {
    it(`responds with JSON containing authors"`, async () => {
        const response = await request(app).get(`/authors`);

        expect(response.status).toBe(200);
    });
});
