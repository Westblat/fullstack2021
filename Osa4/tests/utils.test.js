const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})
describe('most popular', () => {
    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa61b54a676234d17f8',
            title: 'Go To Statement Considered Harmful 2',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 420,
            __v: 1
        },
        {
            _id: '5a422aa71b64a676234d17f8',
            title: 'Go To Statement Considered Harmful 3',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 69,
            __v: 2
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful 2',
            author: 'Edsger W. Dijkstra',
            likes: 420,
        },)
    })
})
describe('most blogs', () => {
    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa61b54a676234d17f8',
            title: 'Go To Statement Considered Harmful 2',
            author: 'Yo mama',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 420,
            __v: 1
        },
        {
            _id: '5a422aa71b64a676234d17f8',
            title: 'Go To Statement Considered Harmful 3',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 69,
            __v: 2
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 2,
        },)
    })
})

describe('most likes', () => {
    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa61b54a676234d17f8',
            title: 'Go To Statement Considered Harmful 2',
            author: 'Yo mama',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 55,
            __v: 1
        },
        {
            _id: '5a422aa71b64a676234d17f8',
            title: 'Go To Statement Considered Harmful 3',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 69,
            __v: 2
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.mostLikes(listWithMultipleBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 74,
        },)
    })
})
