const request = require('jest');
const app = require('../app');

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200);
    })
  });
})

describe('Test the type of response', () => {
  test('It should return type \'text/html\'', () => {
    return request(app).get("/").then(response => {
      expect(response.type).toBe('text/html');
    })
  });
})