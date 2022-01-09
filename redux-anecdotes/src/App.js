import React, {useEffect, useState} from 'react'
import AnecdoteList from "./components/anecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import {initializeAnecdotes} from "./reducers/anecdoteReducer";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
        <Filter/>
      <Notification/>
      <AnecdoteList/>
        <AnecdoteForm/>
    </div>
  )
}

export default App