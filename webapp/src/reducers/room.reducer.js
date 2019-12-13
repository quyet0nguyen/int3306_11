export default function rooms(state={rooms: []}, action) {
    switch (action.type) {
        case 'FETCH_ROOMS_SUCCEEDED':
            return state
    
        default:
            return state
    }
}