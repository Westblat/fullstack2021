import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import CreateBlogForm from '../components/CreateBlogForm'

const blog = {
    id: 3,
    author: 'me',
    title: 'yo mama',
    likes: 69,
    url: 'lmfaooo',
}

const user = {
    username: 'make',
    name: 'not releveant',
    id: 4,
}


test('renders content', () => {
    const component = render(
        <Blog key={blog.id} blog={blog} handleLike={() => console.warn('nope')} handleDelete={() => console.warn('nope')} user={user}/>,
    )

    const element = component.getByText(
        `${blog.title} ${blog.author}`,
    )
    const div = component.container.querySelector('.for-testing-purposes')

    expect(element).toBeDefined()
    expect(div).toBe(null)
})

test('renders content after click', () => {

    const component = render(
        <Blog key={blog.id} blog={blog} handleLike={() => console.warn('nope')} handleDelete={() => console.warn('nope')} user={user}/>,
    )

    const button = component.container.querySelector('.show-blog')
    fireEvent.click(button)

    const element_likes = component.getByText(
        `${blog.likes}`,
    )
    expect(element_likes).toBeDefined()
    const element_url = component.getByText(
        `${blog.url}`,
    )
    expect(element_url).toBeDefined()

})
test('likes are clicked twice', () => {
    const mockHandler = jest.fn()
    const component = render(
        <Blog key={blog.id} blog={blog} handleLike={mockHandler} handleDelete={() => console.warn('nope')} user={user}/>,
    )

    const button = component.container.querySelector('.show-blog')
    fireEvent.click(button)

    const likeButton = component.container.querySelector('.like-button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
test('form test', () => {
    const mockHandler = jest.fn().mockImplementation(() => Promise.resolve())
    const fillerMock = jest.fn()

    const component = render(
        <CreateBlogForm createBlog={mockHandler} setBlogs={fillerMock} blogs={{}} setSuccessMessage={fillerMock} setCreateVisible={fillerMock} setErrorMessage={fillerMock}/>,
    )

    const title = component.container.querySelector('[name="title"]')
    const author = component.container.querySelector('[name="author"]')
    const url = component.container.querySelector('[name="url"]')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'this is a title' },
    })
    fireEvent.change(author, {
        target: { value: 'this is a author' },
    })
    fireEvent.change(url, {
        target: { value: 'this is a url' },
    })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls[0][0].title).toBe('this is a title')
    expect(mockHandler.mock.calls[0][0].author).toBe('this is a author')
    expect(mockHandler.mock.calls[0][0].url).toBe('this is a url')
})