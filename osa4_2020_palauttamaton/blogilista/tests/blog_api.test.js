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

test('likes ei anneta arvoa', async () => {
  const testNoLikes = {
    title: 'Ei tykkäyksiä -blogi',
    author: 'Testeri',
    url: 'http://www.yle.fi',
  }

  let response = await api.post('/api/blogs').send(testNoLikes)
  expect(response.body.title).toBe(testNoLikes.title)
  expect(response.body.author).toBe(testNoLikes.author)
  expect(response.body.url).toBe(testNoLikes.url)
  expect(response.body.likes).toBe(0)
})

test('lisäys ilman titlea ja urlia', async () => {
  const testNoTitle = {
    author: 'Testeri',
    url: 'http://www.yle.fi',
    likes: 6
  }

  const testNoUrl = {
    title: 'URL-less blog',
    author: 'Testeri',
    likes: 6
  }

  let response = await api.post('/api/blogs').send(testNoTitle)
  expect(response.status).toBe(400)
  response = await api.post('/api/blogs').send(testNoUrl)
  expect(response.status).toBe(400)
})

afterAll(() => {
  mongoose.connection.close()
})
