import request from 'supertest';
import app from './index';

describe('GET /', () => {
    it('responds with "Hello, World!"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Hello, World!');
    });
});
