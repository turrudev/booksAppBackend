import request from 'supertest';
import app from "../../../index";

describe('GET /authors/:name', () => {
    const testCases = [
        {name: 'John', expectedLength: 0},
        {name: 'Harper', expectedLength: 1},
        {name: 'J', expectedLength: 3},
        {name: 'fdsfdsffdsfJ', expectedLength: 0}
    ];

    testCases.forEach(({name, expectedLength}) => {
        it(`responds with JSON containing authors matching the provided name "${name}"`, async () => {
            const response = await request(app).get(`/authors/${name}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(expectedLength);
        });
    });
});
