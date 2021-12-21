import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './app.css'
import CreateBlogForm from './components/CreateBlogForm'


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
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [loginForm, setLoginForm] = useState({})
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [createVisible, setCreateVisible] = useState(false)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs ))
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
        }).catch(error => setErrorMessage(error.response.data.error))
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    const handleLike = (blog) => {
        const body = { ...blog }
        body['likes'] = blog['likes'] + 1
        blogService.updateBlog(body).then(response => {
            const oldBlogs = blogs.filter(b => b.id !== response.id)
            setBlogs([...oldBlogs, response])
        })
    }

    const handleDelete = (blog) => {
        if(window.confirm(`Delete ${blog.title} ?`)){
            blogService.deleteBlog(blog.id).then(() => {
                setBlogs(blogs.filter(b => b.id !== blog.id))
                setSuccessMessage('Blog deleted succesfully')
            }).catch(error => setErrorMessage(error.response.data.error))

        }
    }


    useEffect(() => {
        if (successMessage) setTimeout(() => {setSuccessMessage(null)}, 5000)
    }, [successMessage])

    useEffect(() => {
        if (errorMessage) setTimeout(() => {setErrorMessage(null)}, 5000)
    }, [errorMessage])

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
                            <CreateBlogForm
                                createBlog={blogService.createBlog}
                                setSuccessMessage={setSuccessMessage}
                                setCreateVisible={setCreateVisible}
                                setErrorMessage={setErrorMessage}
                                blogs={blogs}
                                setBlogs={setBlogs}
                            />
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