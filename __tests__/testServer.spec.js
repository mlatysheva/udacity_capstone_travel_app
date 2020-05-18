const request = require("supertest");
const app = require('../src/server/server');

describe("Test the code of the root path", () => {
  test("The response to the GET method should be 200", async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});


describe('Test that the server POST endpoint gives the OK status of 200', () => {
  test('A new post should be created and the status should be OK', async () => {
    const res = await request(app)
      .post('/trip')
      .send({
        city: 'London',
        country: 'UK',
        duration: 7,
        length: 11,
        longitude: -0.12574,
        latitude: 51.50853,
        max_temp: 25.6,
        min_temp: 13.6,
        weather_desc: 0.125,
        imageUrl:'https://pixabay.com/get/53e3d5434f57b10ff3d8992cc62e3278163ad8e54e5074417c2872d59e4dc1_640.jpg'
      })
    expect(res.statusCode).toEqual(200)
  })
})