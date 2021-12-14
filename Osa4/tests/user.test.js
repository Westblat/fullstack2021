const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// Setup
const User = require('../models/user')
const initialUsers = [
    {
        "username": "miika",
        "name": "Miko Nietstrom",
        //Gotta change this if there is login tests
        "password": "hopis"
    },
    {
        "username": "hopis",
        "name": "hoponassu",
        "password": "miika"
    },
]

beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = initialUsers
        .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

afterAll(() => {
    mongoose.connection.close()
})

describe('failing user creation', () => {
    test('username length 2', async () => {
        const shitUser = {username: "ma", password: "olispa", name: "mutsis"}
        const response = await api.post('/api/users').send(shitUser)

        expect(response.status).toEqual(400)
    }, 1000000)

    test('password length 2', async () => {
        const shitUser = {username: "make", password: "ol", name: "mutsis"}
        const response = await api.post('/api/users').send(shitUser)

        expect(response.status).toEqual(400)
    }, 1000000)

    test('non-unique name', async () => {
        const shitUser = {username: "miika", password: "ol", name: "mutsis"}
        const response = await api.post('/api/users').send(shitUser)

        expect(response.status).toEqual(400)
    }, 1000000)
})
