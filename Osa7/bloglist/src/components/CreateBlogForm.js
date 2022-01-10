import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const CreateBlogForm = () => {
    const [createForm, setCreateForm] = useState({ title: '', url: '', author: '' })
    const dispatch = useDispatch()

    const handleCreateChange = e => {
        const copy = { ...createForm }
        copy[e.target.name] = e.target.value
        setCreateForm(copy)
    }
    const handleCreate = (e) => {
        e.preventDefault()
        dispatch(createBlog(createForm))
        setCreateForm({ title: '', url: '', author: '' })
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