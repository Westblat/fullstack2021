import React,{ useState } from 'react'
import './blog.css'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
    const [visible, setVisible] = useState(false)

    return (
        <div className='blog-wrapper'>
            <span>{blog.title} {blog.author}
                <button
                    className='show-blog'
                    onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}
                </button>
            </span>
            {visible && (
                <span className='for-testing-purposes'>
                    <p>{blog.url}</p>
                    <p>{blog.likes}
                        <button
                            className='like-button'
                            onClick={() => handleLike(blog)}
                        >
                            Like
                        </button>
                    </p>
                    {/*Why done with id? Because couldn't get backend to return other then id
                    and was not going to spend time on that task anymore*/}
                    {blog?.user && blog.user.id === user.id && <button
                        id='remove-blog'
                        onClick={() => handleDelete(blog)}
                    >Remove</button>}
                </span>
            )}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

export default Blog