const bcrypt = require('bcryptjs')
const User = require('../models/user')
const userRouter = require('express').Router()

userRouter.post('/', async (request, response) => {
    const body = request.body
    const saltRounds = 10
    if (body.password.length < 3) return response.status(400).json({error: "Password must be longer then 3 characters"})
    const password = await bcrypt.hash(body.password, saltRounds)
    const newUser = new User({
        username: body.username,
        name: body.name,
        password,
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users =  await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})
    response.json(users)
})

module.exports = userRouter