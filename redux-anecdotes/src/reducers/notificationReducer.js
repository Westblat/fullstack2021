const initialState = ''


let previousTimeout = null;

export const createNotification = (content, timeout) => {
    clearTimeout(previousTimeout);
    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            data: content,
        })
        previousTimeout = setTimeout(() => {
            dispatch({
                type: 'DELETE_NOTIFICATION',
            })
            previousTimeout = null
        }, timeout)
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.data
        case 'DELETE_NOTIFICATION':
            return ''
        default: return state
    }
}

export default reducer