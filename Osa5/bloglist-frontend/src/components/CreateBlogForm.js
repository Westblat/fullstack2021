import React, { useState } from 'react'

const CreateBlogForm = ({ createBlog, setBlogs, blogs, setSuccessMessage, setCreateVisible, setErrorMessage }) => {
    const [createForm, setCreateForm] = useState({ title: '', url: '', author: '' })

    const handleCreateChange = e => {
        const copy = { ...createForm }
        copy[e.target.name] = e.target.value
        setCreateForm(copy)
    }
    const handleCreate = (e) => {
        e.preventDefault()
        createBlog(createForm)
            .then(response => {
                setBlogs([...blogs, response])
                setCreateForm({ title: '', url: '', author: '' })
                setCreateVisible(false)
                setSuccessMessage('Blog created successfully')
            }).catch(error => {
                setErrorMessage(error.response.data.error)
            })

    }

    return(
        <form onSubmit={handleCreate}>
            <div>
                title: <input name='title' value={createForm['title']} onChange={e => handleCreateChange(e)}/>
            </div>
            <div>
                author: <input name='author' value={createForm['author']} onChange={e => handleCreateChange(e)}/>
            </div>
            <div>
                url: <input name='url' value={createForm['url']} onChange={e => handleCreateChange(e)}/>
            </div>
            <button type='submit' id='create-blog'>Create</button>
        </form>
    )
}

export default CreateBlogForm