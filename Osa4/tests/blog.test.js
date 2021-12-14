const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// Setup
const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
        "title": "Oispa borstaa",
        "author": "Miko Nietstrom",
        "url": "https://www.reddit.com/r/leagueoflegends/",
        "likes": 69,
    },
    {
        "title": "Oispa kaljaa",
        "author": "hoponassu",
        "url": "https://www.reddit.com/r/destinythegame/",
        "likes": 420
    }
]
const initialUsers = [
    {
        "username": "hopis",
        "name": "hoponassu",
        "password": "$2a$10$ZYminrOjJRHoWyh7YFIWMeLpDxkI6fxk/FCO8mAihIc/QzBVH0GqG" //miika
    },
]
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhvcGlzIiwiaWQiOiI2MWI4YWIxMjcxZjQyMjg3MjQwNTYwOGUiLCJpYXQiOjE2Mzk0OTIzODB9.CULRyKjs8sXQV3q8rLeMU32clY3lG33AlrToHaIWfO0'

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const blogObjects = initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    const userObjects = initialUsers
        .map(user => new User(user))
    const userPromiseArray = userObjects.map(user => user.save())
    await Promise.all(userPromiseArray)

})

afterAll(() => {
    mongoose.connection.close()
})

const login = async () => {
    const user = await api.post('/api/login').send({
        "username": "hopis",
        "password": "miika"
    })
    return user.body.token

}

test('amount of blogs returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
}, 1000000)

test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    expect(response.body[0].id).toBeDefined()
}, 1000000)

describe('creating new blog', () => {
    test('create new blog', async () => {
        const token = await login()
        const newBlog = {
            "title": "Rip Sarsku ;__;",
            "author": "Sarsku",
            "url": "https://www.reddit.com/r/2007scape/",
            "likes": 1
        }
        const creation = await api.post('/api/blogs').send(newBlog).set({ 'Authorization': 'Bearer ' + token })
        expect(creation.body.name).toEqual(newBlog.name)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length + 1)

    }, 1000000)

    test('create new blog without auth', async () => {
        const newBlog = {
            "title": "Rip Sarsku ;__;",
            "author": "Sarsku",
            "url": "https://www.reddit.com/r/2007scape/",
            "likes": 1
        }
        const creation = await api.post('/api/blogs').send(newBlog)
        expect(creation.status).toEqual(401)

    }, 1000000)

    test('create new blog with no likes', async () => {
        const token = await login()
        const newBlog = {
            "title": "Rip Sarsku ;__;",
            "author": "Sarsku",
            "url": "https://www.reddit.com/r/2007scape/",
        }
        const creation = await api.post('/api/blogs').send(newBlog).set({ 'Authorization': 'Bearer ' + token })
        expect(creation.body.likes).toEqual(0)

    }, 1000000)

    test('fail creating new blog', async () => {
        const token = await login()
        const newBlog = {
            "author": "Sarsku",
        }
        const creation = await api.post('/api/blogs').send(newBlog).set({ 'Authorization': 'Bearer ' + token })
        expect(creation.status).toEqual(400)

    }, 1000000)

})

test('delete blog', async () => {
    const token = await login()
    const newBlog = {
        "title": "Rip Sarsku ;__;",
        "author": "Sarsku",
        "url": "https://www.reddit.com/r/2007scape/",
        "likes": 1
    }
    const creation = await api.post('/api/blogs').send(newBlog).set({ 'Authorization': 'Bearer ' + token })
    const id = creation.body.id

    //Make sure creation succeeded
    const list = await api.get('/api/blogs')
    expect(list.body).toHaveLength(initialBlogs.length + 1)

    //delete the created blog
    const deletion = await api.delete(`/api/blogs/${id}`).set({ 'Authorization': 'Bearer ' + token })
    expect(deletion.status).toEqual(204)

    //Make sure deletion succeeded
    const secondList = await api.get('/api/blogs')
    expect(secondList.body).toHaveLength(initialBlogs.length)
})

test('update blog', async () => {
    const list = await api.get('/api/blogs')
    const id = list.body[0].id
    const update = await api.put(`/api/blogs/${id}`).send({likes: 123})
    expect(update.status).toEqual(200)
    expect(update.body.likes).toEqual(123)
})