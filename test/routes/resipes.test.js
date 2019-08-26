const request = require('supertest');
const fs = require('fs');
const path = require('path');
const server = require('../../app');

describe('/recipes', () => {
  const dataFile = path.resolve(__dirname, '../../seedData/recipe-data.csv');
  const dataFileBkp = path.resolve(__dirname, '../../seedData/recipe-data_bkp.csv');

  beforeAll(() => {
    // copy the database, becaues the tests will change it
    fs.createReadStream(dataFile)
      .pipe(fs.createWriteStream(dataFileBkp));
  });

  afterAll(() => {
    fs.unlinkSync(dataFile); // delete the modified data
    fs.renameSync(dataFileBkp, dataFile); // restore
    server.close();
  });

  describe('GET /recipes/:id', () => {
    it('should return 200 OK with recipe JSON data', (done) => {
      request(server)
        .get('/recipes/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, data) => {
          if (err) return done(err);
          expect(data.body).toMatchSnapshot();
          return done();
        });
    });
    it('should return 404 Not Found when recipe is not found', (done) => {
      request(server)
        .get('/recipes/INVALID_INDEX')
        .expect(404, done);
    });
  });

  describe('GET /recipes', () => {
    it('should return 200 OK with 10 available recipes', (done) => {
      request(server)
        .get('/recipes')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, data) => {
          if (err) return done(err);
          expect(data.body).toMatchSnapshot();
          return done();
        });
    });

    it('should return 200 OK with recipes for specified recipe_cuisine', (done) => {
      request(server)
        .get('/recipes?recipe_cuisine=mexican')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, data) => {
          if (err) return done(err);
          expect(data.body).toMatchSnapshot();
          return done();
        });
    });
  });

  describe('PUT /recipes', () => {
    it('should return 200 OK with the updated recipe', (done) => {
      request(server)
        .put('/recipes/1')
        .send({ description: 'I have changed', title: 'Changed title' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, data) => {
          if (err) return done(err);
          expect(data.body).toMatchSnapshot();
          return done();
        });
    });

    it('should return 404 Not Found when the recipe is not found', (done) => {
      request(server)
        .put('/recipes/INVALID_INDEX')
        .send({ description: 'I have changed', title: 'Changed title' })
        .expect(404, done);
    });

    // Enable me when functionality is implemented
    it.skip('should return 400 Bad request when trying to update invalid fields', (done) => {
      request(server)
        .put('/recipes/INVALID_INDEX')
        .send({ description: 'I have changed', title: 'Changed title', nonExisting: true })
        .expect(400, done);
    });

    // Enable me when functionality is implemented
    it.skip('should return 400 Bad request when trying to update field with invalid data', (done) => {
      request(server)
        .put('/recipes/INVALID_INDEX')
        .send({ description: true, title: 'Changed title' })
        .expect(400, done);
    });
  });
});
