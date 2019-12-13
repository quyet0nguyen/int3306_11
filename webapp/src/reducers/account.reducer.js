export default function accounts(state={accounts: []}, action) {
    switch (action.type) {
        case 'CREATE_ACCOUNT_SUCCEEDED': {
            return {
                accounts: state.accounts.concat(action.payload.account.data)
            }
        }
        case 'FETCH_ACCOUNTS_SUCCEEDED': {
            return {
                accounts: action.payload.accounts
            }
        }
        case 'IMPORT_ACCOUNTS_SUCCEEDED': {
            // console.log(action.payload)
            if(action.payload.data) {
                return {accounts: state.accounts.concat(action.payload.data)}
            } else {
                return {accounts: state.accounts}
            }
        }
        case 'UPDATE_ACCOUNT_SUCCEEDED': {
            const {payload} = action
            // console.log(payload)
            return {accounts: state.accounts.map(account => {
                if(account.id === payload.id) {
                    return Object.assign({}, account, payload.param)
                }
                return account
            })}
            
        }
        default: {
            return state
        }
    }
}

// case 'EDIT_TASK_SUCCEEDED': {
//     const { payload } = action;
//     const nextTasks = state.tasks.map(task => {
//         if (task.id === payload.task.id) {
//             return payload.task;
//         }
//         return task;
//     });
//     return {
//         ...state,
//         tasks: nextTasks,
//     };
// }