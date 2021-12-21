export default function reducer (state, action) {
    switch (action.type) {
        case 'MODAL_EDIT_PROFILE': {
            return {...state, modalEditProfile: action.paylod}
        }
        case 'IMG': {
            return {...state, paylod: action.type}
        }
        case 'LOADED_IMG': {
            return {...state, paylod: action.type}
        }
        case 'PROFILE': {
            return {...state, profile: action.paylod}
        }
        default: 
            return state
    }
}
