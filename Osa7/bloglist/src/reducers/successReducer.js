const initialState = ''


let previousTimeout = null

export const createSuccess = (content, timeout) => {
    clearTimeout(previousTimeout)
    return async dispatch => {
        dispatch({
            type: 'NEW_SUCCESS',
            data: content,
        })
        previousTimeout = setTimeout(() => {
            dispatch({
                type: 'DELETE_SUCCESS',
            })
            previousTimeout = null
        }, timeout)
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'NEW_SUCCESS':
        return action.data
    case 'DELETE_SUCCESS':
        return ''
    default: return state
    }
}

export default reducer