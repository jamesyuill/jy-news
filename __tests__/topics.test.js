const app = require('../serverFiles/app.js');
const testData = require('../db/data/test-data/index.js');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe('CORE: GET /api/topics', () => {
  test('Should return an array of topic objects', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.allTopics)).toBe(true);
      });
  });
  test('Should return ALL topics in the array', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.allTopics).toHaveLength(3);
      });
  });
});