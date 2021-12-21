export default function reducer (state, action) {
    switch (action.type) {
        case 'QUOTE': {
            return {...state, payload: !action.payload}
        }
        case 'IMG': {
            return {...state, payload: action.type}
        }
        case 'CURRENT_DATA': {
            return {...state, payload: action.type}
        }
        case 'PREVIEW_DATA': {
            return {...state, payload: state.type}
        }
        default: 
            return state
    }
}
