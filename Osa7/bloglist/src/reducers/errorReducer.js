const initialState = ''


let previousTimeout = null

export const createError = (content, timeout) => {
    clearTimeout(previousTimeout)
    return async dispatch => {
        dispatch({
            type: 'NEW_ERROR',
            data: content,
        })
        previousTimeout = setTimeout(() => {
            dispatch({
                type: 'DELETE_ERROR',
            })
            previousTimeout = null
        }, timeout)
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'NEW_ERROR':
        return action.data
    case 'DELETE_ERROR':
        return ''
    default: return state
    }
}

export default reducer