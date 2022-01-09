import React from "react";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {connect} from "react-redux";
import {createNotification} from "../reducers/notificationReducer";

const AnecdoteForm = ({createAnecdote, createNotification}) => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        createAnecdote(e.target.anecdote.value)
        createNotification('You created ' + e.target.anecdote.value, 5000)
        e.target.anecdote.value = ''
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>

        </div>
    )
}

const mapDispatchToProps = {
    createNotification,
    createAnecdote,
}
export default connect(null, mapDispatchToProps)(AnecdoteForm);