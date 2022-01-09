import React from "react";
import {voteAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch, useSelector} from "react-redux";
import {createNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id, anecdote) => {
        dispatch(voteAnecdote(id, anecdote))
        const voted = anecdotes.find(a => a.id === id)
        dispatch(createNotification('You voted for ' + voted.content, 5000))
    }

    const sort = (a,b) => {
        if (a > b) return -1
        else if (a < b) return 1
        else return 0
    }
    const sortedAnecdotes = anecdotes.sort((a, b) => sort(a.votes, b.votes))
    const filteredAnecdotes = sortedAnecdotes.filter(a => a.content.includes(filter))

    return(
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AnecdoteList;