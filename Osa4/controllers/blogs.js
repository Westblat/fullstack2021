const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs =  await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    body['user'] = user._id
    const newBlog = new Blog(request.body)
    const result = await newBlog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save({ validateBeforeSave: false })

    response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
    const data = { likes: request.body.likes }
    console.log(request.body)
    const updated = await Blog.findByIdAndUpdate(request.params.id, data, { new: true });
    response.status(200).json(updated)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === request.user.id.toString()) {
        const deleted = await blog.remove()
        response.status(204).json(deleted)
    } else {
        response.status(400).json({error: "Only the creator of blog can delete it"})
    }

})


module.exports = blogsRouter
