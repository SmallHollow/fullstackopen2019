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

  expect(response.body.length).toBe(2)
})

test('id-kenttä', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('uuden blogin lisäys', async () => {
  let response = await api.get('/api/blogs')
  const blogCount = response.body.length

  const testBlog = {
    title: 'Testausblogi',
    author: 'Testeri',
    url: 'http://www.yle.fi',
    likes: 6
  }

  response = await api.post('/api/blogs').send(testBlog)

  response = await api.get('/api/blogs')
  expect(response.body.length).toBe(blogCount+1)
  const lastBlog = response.body[blogCount]
  expect(lastBlog.title).toBe(testBlog.title)
  expect(lastBlog.author).toBe(testBlog.author)
  expect(lastBlog.url).toBe(testBlog.url)
  expect(lastBlog.likes).toBe(testBlog.likes)

})

afterAll(() => {
  mongoose.connection.close()
})
