import blogService from '../services/blogs'
import { createSuccess } from './successReducer'

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs =  await blogService.getAll()
        dispatch({
            type: 'INITIALIZE',
            data: blogs,
        },
        )
    }
}

export const likeBlog = (blog) => {
    const body = { ...blog }
    body['likes'] = blog['likes'] + 1
    return async dispatch => {
        const updatedBlog =  await blogService.updateBlog(body)
        dispatch({
            type: 'LIKE',
            data: updatedBlog,
        },
        )
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.deleteBlog(blog.id)
        dispatch({
            type: 'DELETE',
            data: blog.id,
        },
        )
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const createdBlog =  await blogService.createBlog(blog)
        dispatch({
            type: 'CREATE',
            data: createdBlog,
        })
        dispatch(createSuccess(`You have created blog ${blog.title}`, 5000))
    }
}
const reducer = (state = [], action) => {
    switch (action.type) {
    case 'LIKE':
        // eslint-disable-next-line no-case-declarations
        const newState = state.filter(blog => blog.id !== action.data.id)
        return [...newState, action.data]
    case 'DELETE':
        return state.filter(b => b.id !== action.data)
    case 'CREATE':
        return [...state, action.data]
    case 'INITIALIZE':
        return action.data
    default: return state
    }
}

export default reducer