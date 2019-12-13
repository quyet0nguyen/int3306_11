import rooms from './room.reducer'
import accounts from './account.reducer'



const rootReducer = (state = {}, action) => {
    return {
        accountReducer: accounts(state.accounts, action),
        roomReducer: rooms(state.rooms, action),

    }
}
export default rootReducer;

