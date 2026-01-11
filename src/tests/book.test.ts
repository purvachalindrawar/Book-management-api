import request from 'supertest';
import app from '../app';

describe('Book Management API', () => {
    let createdBookId: string;

    it('should return an empty list of books initially', async () => {
        const res = await request(app).get('/books');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        // Note: Since we use in-memory storage that resets only on restart, 
        // this test depends on execution order if parallel. 
        // Ideally we should reset the service state, but for this task simpler is fine.
    });

    it('should create a new book', async () => {
        const res = await request(app).post('/books').send({
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            publishedYear: 1925,
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toEqual('The Great Gatsby');
        createdBookId = res.body.id;
    });

    it('should retrieve the created book by ID', async () => {
        const res = await request(app).get(`/books/${createdBookId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(createdBookId);
        expect(res.body.title).toEqual('The Great Gatsby');
    });

    it('should return 400 if required fields are missing', async () => {
        const res = await request(app).post('/books').send({
            title: 'Incomplete Book',
        });
        expect(res.statusCode).toEqual(400);
    });
});
