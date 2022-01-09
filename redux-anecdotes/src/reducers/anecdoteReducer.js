import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteAnecdote = (id, anecdote) => {
  const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, votedAnecdote)
    dispatch({
          type: 'VOTE',
          data: updatedAnecdote
        }
    )
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }

}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}



const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const changedAnecdote = action.data
      return state.map(anec =>
          anec.id !== changedAnecdote.id ? anec : changedAnecdote
      )
    case 'CREATE':
      console.log(state, action.data)
      return [...state, action.data]
    case 'INITIALIZE':
      return action.data
    default: return state
  }
}

export default reducer