const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogi palauttaa jsonia', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('listassa on x blogia', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(1)
})

afterAll(() => {
  mongoose.connection.close()
})
