const app = require('../serverFiles/app.js');
const testData = require('../db/data/test-data/index.js');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const endpoints = require('../serverFiles/endpoints.json');
const jestsorted = require('jest-sorted');

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

describe('CORE: GET /api/articles/:article_id', () => {
  test('200: Should return an article object', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.article).toBe('object');
      });
  });
  test('200: Returning object should have the appropriate keys', () => {
    const exampleObject = {
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: '2020-07-09T20:11:00.000Z',
      votes: 100,
      article_img_url:
        'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
    };

    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toMatchObject(exampleObject);
      });
  });
  test('404: Error returned if article_id is correct type but doesn_t exist', () => {
    return request(app)
      .get('/api/articles/999')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found');
      });
  });
  test('400: Error returned if article_id is invalid type', () => {
    return request(app)
      .get('/api/articles/cheese')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request');
      });
  });
});

describe('CORE: GET /api/articles', () => {
  test('200: should return an array of objects', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(Array.isArray(articles)).toBe(true);
        expect(typeof articles[0]).toBe('object');
      });
  });
  test('200: should return an array with the length 5', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles).toHaveLength(5);
      });
  });
  test('200: the returned objects should have the correct properties', () => {
    const exampleObject = {
      comment_count: '2',
      author: 'icellusedkars',
      title: 'Eight pug gifs that remind me of mitch',
      article_id: expect.any(Number),
      topic: 'mitch',
      created_at: '2020-11-03T09:12:00.000Z',
      votes: 0,
      article_img_url:
        'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
    };

    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles[0]).toMatchObject(exampleObject);
      });
  });
  test('200: returning array of articles should be sorted by date in descending order', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles).toBeSortedBy('created_at', { descending: true });
      });
  });
});

describe('CORE: GET /api/articles/:article_id/comments', () => {
  test('200: should return an array of objects', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;
        expect(Array.isArray(comments)).toBe(true);
        expect(typeof comments[0]).toBe('object');
      });
  });
  test('200: returned array should have length of 11', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;
        expect(comments).toHaveLength(11);
      });
  });
  test('200: the returned comment object should have the correct properties', () => {
    const exampleObject = {
      comment_id: expect.any(Number),
      body: 'I hate streaming noses',
      article_id: 1,
      author: 'icellusedkars',
      votes: expect.any(Number),
      created_at: '2020-11-03T21:00:00.000Z',
    };

    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;
        expect(comments[0]).toMatchObject(exampleObject);
      });
  });
  test('200: returning array of comments should be sorted by most recent first', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;
        expect(comments).toBeSortedBy('created_at', { descending: true });
      });
  });
  test('404: responds with error if article_id is correct type but non existent', () => {
    return request(app)
      .get('/api/articles/999/comments')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found');
      });
  });
  test('400: responds with error if article_id is invalid type', () => {
    return request(app)
      .get('/api/articles/egg/comments')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request');
      });
  });
});

describe('CORE: POST /api/articles/:article_id/comments', () => {
  test('201: should return an object with the created comment data', () => {
    const dummyComment = {
      username: 'butter_bridge',
      body: 'great article, if only it were 1000 pages shorter',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(dummyComment)
      .expect(201)
      .then(({ body }) => {
        const { newComment } = body;
        expect(typeof newComment).toBe('object');
      });
  });
  test('201: should return the newly created comment object with correct properties', () => {
    const dummyComment = {
      username: 'butter_bridge',
      body: 'great article, if only it were 1000 pages shorter',
    };
    const exampleObject = {
      author: expect.any(String),
      body: expect.any(String),
      votes: expect.any(Number),
      article_id: expect.any(Number),
      created_at: expect.any(String),
      comment_id: expect.any(Number),
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(dummyComment)
      .expect(201)
      .then(({ body }) => {
        const { newComment } = body;
        expect(newComment).toMatchObject(exampleObject);
      });
  });
  test('400: responds with error if input object doesn_t have correct properties', () => {
    const dummyComment = {
      author: 'butter_bridge',
      body: 'great article, if only it were 1000 pages shorter',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(dummyComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request');
      });
  });
  test('404: responds with error if user doesn_t exist', () => {
    const dummyComment = {
      username: 'james',
      body: 'great article, if only it were 1000 pages shorter',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(dummyComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found');
      });
  });
  test('404: responds with error if article_id doesn_t exist', () => {
    const dummyComment = {
      username: 'butter_bridge',
      body: 'great article, if only it were 1000 pages shorter',
    };
    return request(app)
      .post('/api/articles/999/comments')
      .send(dummyComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found');
      });
  });
  test('400: responds with error if article_id is invalid type', () => {
    const dummyComment = {
      username: 'butter_bridge',
      body: 'great article, if only it were 1000 pages shorter',
    };
    return request(app)
      .post('/api/articles/egg/comments')
      .send(dummyComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request');
      });
  });
});


describe('CORE: PATCH /api/articles/:article_id', () => {
  test('201: should respond with object', () => {
    const newVote = 10;
    const patchInput = { inc_votes: newVote };
    return request(app)
      .patch('/api/articles/9')
      .send(patchInput)
      .expect(201)
      .then(({ body }) => {
        expect(typeof body.updatedArticle).toBe('object');
      });
  });
  test('201: when passed a value of 10 should increment votes by ten', () => {
    const newVote = 10;
    const patchInput = { inc_votes: newVote };

    return request(app)
      .patch('/api/articles/9')
      .send(patchInput)
      .expect(201)
      .then(({ body }) => {
        expect(body.updatedArticle.votes).toEqual(10);
      });
  });
  test('201: when passed a value of -10 should decrement votes by ten', () => {
    const newVote = -10;
    const patchInput = { inc_votes: newVote };

    return request(app)
      .patch('/api/articles/9')
      .send(patchInput)
      .expect(201)
      .then(({ body }) => {
        expect(body.updatedArticle.votes).toEqual(-10);
      });
  });
  test('404: responds with error when passed an article_id that is valid type but non-existent', () => {
    const newVote = 10;
    const patchInput = { inc_votes: newVote };

    return request(app)
      .patch('/api/articles/999')
      .send(patchInput)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found');
      });
  });
  test('400: responds with error when passed an article_id that is an invalid type', () => {
    const newVote = 10;
    const patchInput = { inc_votes: newVote };

    return request(app)
      .patch('/api/articles/egg')
      .send(patchInput)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request');
      });
  });
  test('400: responds with error when passed an object with no body', () => {
    const patchInput = {  };

    return request(app)
      .patch('/api/articles/egg')
      .send(patchInput)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request');
      });
  });
});

describe('CORE: DELETE /api/comments/:comment_id', () => {
  test('204: reponds with no content', () => {
    return request(app)
      .delete('/api/comments/1')
      .expect(204)
      .then(( {body} ) => {
        expect(body).toEqual({});
      });
  });
  test('404: responds with error when given a comment_id that is valid but non-existent', () => {
    return request(app)
      .delete('/api/comments/999')
      .expect(404)
      .then(( {body} ) => {
        expect(body.msg).toBe('Not found');
      });
  });

  test('400: responds with error when given a comment_id that is invalid type', () => {
    return request(app)
      .delete('/api/comments/simonlebon')
      .expect(400)
      .then(( {body} ) => {
        expect(body.msg).toBe('Bad request')
      }
      )}
  )
})

describe('CORE: GET /api/users', ()=>{
  test('200: should return an array of objects',()=>{
    return request(app)
    .get('/api/users')
    .expect(200)
    .then(({body})=>{
      const { users } = body;
      expect(Array.isArray(users)).toBe(true)
      expect(typeof users[0]).toBe('object')
    })
  })
  
  test('200: returning array should contain the correct amount of objects and these objects all contain the correct properties',()=>{
    return request(app)
    .get('/api/users')
    .expect(200)
    .then(({body})=>{
      const { users } = body
      expect(users).toHaveLength(4);

      users.forEach(user => {
        expect(user).toHaveProperty('username', expect.any(String))
        expect(user).toHaveProperty('name', expect.any(String))
        expect(user).toHaveProperty('avatar_url', expect.any(String))
      } )


    })
  })
})