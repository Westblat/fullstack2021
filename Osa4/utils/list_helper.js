const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = blogs => {
    const popular = blogs.reduce((acc, cur) => {
        if(!acc) return cur
        if (acc.likes > cur.likes) return acc
        else return cur
    })
    return {
        title: popular.title,
        author: popular.author,
        likes: popular.likes,

    }
}

const mostBlogs = blogs => {
    const values = {};
    blogs.forEach(blog => {
        if (!values[blog.author]){
            const amount = blogs.filter(v => v.author === blog.author).length
            values[blog.author] = amount
        }
    })
    const most = Object.keys(values).reduce((acc, cur) => {
        if(!acc) return values[cur]
        if (values[acc] > values[cur]) return acc
        else return cur
    })
    return {
        author: most,
        blogs: values[most],
    }
}

const mostLikes = blogs => {
    const values = {};
    blogs.forEach(blog => {
        if(!values[blog.author]) values[blog.author] = blog.likes
        else values[blog.author] = values[blog.author] + blog.likes
    })
    const most = Object.keys(values).reduce((acc, cur) => {
        if(!acc) return values[cur]
        if (values[acc] > values[cur]) return acc
        else return cur
    })
    return {
        author: most,
        likes: values[most],
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}