const { expect } = require('chai');
const request = require('supertest');
const { Author } = require('../src/models');
const app = require('../src/app');

describe('/authors', () => {
    before(async () => Author.sequelize.sync());

    beforeEach(async () => {
        await Author.destroy({ where: {} });
    });

  describe('with no authors in the database', () => {
    describe('POST /authors', () => {
      it('creates a new author in the database', async () => {
        const response = await request(app)
        .post('/authors')
        .send({
          author: 'Gillian Flynn',
        });
        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });
 
        // console.log(newAuthorRecord, '<--newAuthorRecord')

        expect(response.status).to.equal(201);
        expect(response.body.author).to.equal('Gillian Flynn');
        expect(newAuthorRecord.author).to.equal('Gillian Flynn');
      });
    });


    describe('check if author is available', () => {
      it('checks the author field is valid', async () => {
        const response = await request(app)
        .post('/authors')
        .send({
          author: '   ',
        });

        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.toString()).to.equal('The author could not be found.');
        expect(newAuthorRecord).to.equal(null);
      });
    });
  });
  
  describe('with records in the database', () => {
    let authors;

    beforeEach(async () => {
        await Author.destroy({ where: {} });

      authors = await Promise.all([
        Author.create({
          author: 'Raymond Carver',
        }),
        Author.create({ 
            author: 'William Peter Blatty',
        }),
        Author.create({ 
            author: 'Joseph Knox',
        }),
      ]);
    });

    describe('GET /authors', () => {
      it('gets all authors records', async () => {
        const response = await request(app).get('/authors');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((author) => {
          const expected = authors.find((a) => a.id === author.id);

          expect(author.name).to.equal(expected.name);
        });
      });
    });

    describe('GET /authors/:id', () => {
      it('gets authors record by id', async () => {
        const author = authors[0];
        const response = await request(app).get(`/authors/${author.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.author).to.equal(author.author);
      });

      it('returns a 404 if the author does not exist', async () => {
        const response = await request(app).get('/authors/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The author could not be found.');
      });
    });

    describe('PATCH /authors/:id', () => {
      it('updates author by id', async () => {
        const author = authors[0];
        const response = await request(app)
          .patch(`/authors/${author.id}`)
          .send({ author: 'Stephen King' });
        const updatedAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedAuthorRecord.author).to.equal('Stephen King');
      });

      it('returns a 404 if the author does not exist', async () => {
        const response = await request(app)
          .patch('/authors/12345')
          .send({ author: 'some new author' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The author could not be found.');
      });
    });

    describe('DELETE /authors/:id', () => {
      it('deletes author record by id', async () => {
        const author = authors[0];
        const response = await request(app).delete(`/authors/${author.id}`);
        const deletedAuthor = await Author.findByPk(author.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedAuthor).to.equal(null);
      });

      it('returns a 404 if the author does not exist', async () => {
        const response = await request(app).delete('/authors/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The author could not be found.');
      });
    });
  });
});
