const app = require('../serverFiles/app.js');
const testData = require('../db/data/test-data/index.js');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const endpoints = require('../serverFiles/endpoints.json');

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe('CORE: GET /api/topics', () => {
  test('200: Should return an array of topic objects', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.allTopics)).toBe(true);
        expect(typeof body.allTopics[0]).toBe('object');
      });
  });
  test('200: Should return ALL topics in the array', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.allTopics).toHaveLength(3);
      });
  });
  test('200: Returned topic objects should have the properties slug and description', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        const allTopics = body.allTopics;
        allTopics.forEach((topic) => {
          expect(topic).toHaveProperty('slug', expect.any(String));
          expect(topic).toHaveProperty('description', expect.any(String));
        });
      });
  });
  test('404: Error sent if endpoint does not exist', () => {
    return request(app)
      .get('/cheese')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found');
      });
  });
});

describe('CORE: GET /api', () => {
  test('200: should return an object', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe('object');
      });
  });
  test('200: should return an up-to-date version of the endpoints.json file', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(body['api endpoints']).toEqual(endpoints);
      });
  });
});
