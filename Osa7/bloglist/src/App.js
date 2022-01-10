import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './app.css'
import CreateBlogForm from './components/CreateBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, initializeBlogs, likeBlog } from './reducers/blogReducer'
import { createSuccess } from './reducers/successReducer'
import { createError } from './reducers/errorReducer'


const LoginForm = ({ handleLogin, handleLoginChange }) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username: <input name={'username'} onChange={(e) => handleLoginChange(e)} id='username'/>
                </div>
                <div>
                    password: <input
                        name={'password'}
                        type='password'
                        id='password'
                        onChange={(e) => handleLoginChange(e)}
                    />
                </div>
                <button type='submit' id='login-button'>Login</button>
            </form>
        </div>
    )
}

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const successMessage = useSelector(state => state.success)
    const errorMessage = useSelector(state => state.error)
    const [user, setUser] = useState(null)
    const [loginForm, setLoginForm] = useState({})
    const [createVisible, setCreateVisible] = useState(false)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    useEffect(() => {
        const getLoggedUser = async () => {
            const user = await window.localStorage.getItem('user')
            if(user) setUser(JSON.parse(user))
        }
        getLoggedUser()
    }, [])

    const handleLoginChange = e => {
        const copy = { ...loginForm }
        copy[e.target.name] = e.target.value
        setLoginForm(copy)
    }

    const handleLogin = e => {
        e.preventDefault()
        blogService.loginUser(loginForm).then(response => {
            setUser(response)
            window.localStorage.setItem('user', JSON.stringify(response))
            window.localStorage.setItem('accessToken', response.token)
            setLoginForm({})
        }).catch(error => dispatch(createError(error.response.data.error, 5000)))
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    const handleLike = (blog) => {
        dispatch(likeBlog(blog))
        dispatch(createSuccess(`You liked blog ${blog.title}`, 5000))
    }

    const handleDelete = (blog) => {
        if(window.confirm(`Delete ${blog.title} ?`)){
            dispatch(deleteBlog(blog))
            dispatch(createSuccess(`You deleted blog ${blog.title}`, 5000))
        }
    }

    const sort = (a,b) => {
        if (a > b) return -1
        else if (a < b) return 1
        else return 0
    }
    const sortedBlogs = blogs.sort((a, b) => sort(a.likes, b.likes))
    return (
        <div>
            {successMessage && <p className='success'>{successMessage}</p>}
            {errorMessage && <p className='error'>{errorMessage}</p>}
            {user ?
                <div>
                    <h2>blogs</h2>
                    <div>
                        {user.username} is currently logged in <button onClick={() => handleLogout()}>Logout</button>
                    </div>
                    {createVisible ? (
                        <div>
                            <CreateBlogForm/>
                            <button onClick={() => setCreateVisible(false)}>Cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => setCreateVisible(true)} id='show-create'>Create new blog</button>
                    )}

                    {sortedBlogs.map(blog =>
                        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user}/>,
                    )} </div> :
                <LoginForm
                    handleLogin={e => handleLogin(e)}
                    handleLoginChange={e => handleLoginChange(e)}
                />
            }
        </div>
    )
}

export default App