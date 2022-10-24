const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
    before(async () => Book.sequelize.sync());

    beforeEach(async () => {
        await Book.destroy({ where: {} });
    });

    describe('with no books in the database', () => {
        describe('Post /books', () => {
            it('creates a new book in the database', async () => {
                const response = await request(app)
                .post('/books')
                .send({
                    title: 'Misery',
                    author: 'Stephen King',
                    genre: 'Horror',
                    ISBN: 'steking12345',
                });
                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true,
                });

                expect(response.status).to.equal(201);
                expect(response.body.title).to.equal('Misery')
                expect(newBookRecord.title).to.equal('Misery')
                expect(newBookRecord.author).to.equal('Stephen King')
                expect(newBookRecord.genre).to.equal('Horror')
                expect(newBookRecord.ISBN).to.equal('steking12345')
            });
        });
    });

    describe('with records in the database', () => {
        let books;

        beforeEach(async () => {
            books = await Promise.all([
                Book.create({
                    title: 'Misery',
                    author: 'Stephen King',
                    genre: 'Horror',
                    ISBN: 'steking12345',
                }),
                Book.create({ 
                    title: 'The Chain', 
                    author: 'Adrian Mckinty',
                    genre: 'Thriller',
                    ISBN: 'adrmckinty12345'
                }),
                Book.create({ 
                    title: 'The Snowman', 
                    author: 'Jo Nesbo',
                    genre: 'Thriller',
                    ISBN: 'jonesbo12345',
                })
            ]);
        });

        describe('/GET /books', () => {
            it('gets all book records', async () => {
                const response = await request(app).get('/books');

                expect(response.status).to.equal(200);
                expect(response.body.length).to.equal(3);

                response.body.forEach((returnedBook) => {
                    const expected = books.find((book) => book.id === returnedBook.id);

                    expect(returnedBook.title).to.equal(expected.title);
                    expect(returnedBook.author).to.equal(expected.author);
                    expect(returnedBook.genre).to.equal(expected.genre);
                    expect(returnedBook.ISBN).to.equal(expected.ISBN);
                });
            });
        });

        describe('GET /books/:id', () => {
            it('gets book record by id', async () => {
                const book = books[0];
                const response = await request(app).get(`/books/${book.id}`);

                expect(response.status).to.equal(200);
                expect(response.body.title).to.equal(book.title)
                expect(response.body.author).to.equal(book.author)
                expect(response.body.genre).to.equal(book.genre)
                expect(response.body.ISBN).to.equal(book.ISBN)
            });

            it('returns a 404 error if the book does not exist', async () => {
                const response = await request(app).get('/books/9878997877');

                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });

        describe('PATCH /books/:id', () => {
            it('updates the record with id', async () => {
                const book = books[0];
                const response = await request(app)
                .patch(`/books/${book.id}`)
                .send({ ISBN: 'anon12345' });
                const updatedBookRecord = await Book.findByPk(book.id, {
                    raw: true,
                });

                expect(response.status).to.equal(200);
                expect(updatedBookRecord.ISBN).to.equal('anon12345');
            });

            it('returns a 404 error if the book does not exist', async () => {
                const response = await request(app)
                .patch('/books/9878997877')
                .send({ ISBN: 'anon12345' });

                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });

        describe('DELETE /books/:id', () => {
            it('deletes book record by ISBN', async () => {
                const book = books[0];
                const response = await request(app).delete(`/books/${book.id}`);
                const deletedBook = await Book.findByPk(book.id, { raw: true});

                expect(response.status).to.equal(204);
                expect(deletedBook).to.equal(null)
            });

            it('returns a 404 error if the book does not exist', async () => {
                const response = await request(app).delete('/books/9878997877');
                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });
    });
});