import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import successReducer from './reducers/successReducer'
import errorReducer from './reducers/errorReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    success: successReducer,
    error: errorReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk),
    ),
)

export default store
