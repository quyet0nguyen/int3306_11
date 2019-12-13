import * as api from '../api'

export function createAccountSucceeded(account) {
    return {
        type: 'CREATE_ACCOUNT_SUCCEEDED',
        payload: {
            account
        }
    }
}

export function createAccount({username, password, role}) {
    return dispatch => {
        api.createAccount({username, password, role}).then(res => {
            dispatch(createAccountSucceeded(res.data))
        })
    }
}

export function fetchAccountsSucceed(accounts) {
    return {
        type: 'FETCH_ACCOUNTS_SUCCEEDED',
        payload: {
            accounts
        }
    }
}

export function fetchAccounts() {
    return dispatch => {
        api.fetchAccounts().then(res => {
            dispatch(fetchAccountsSucceed(res.data.data))
        })
    }
}

export function importAccountsSucceeded(data) {
    return {
        type: 'IMPORT_ACCOUNTS_SUCCEEDED',
        payload: data
    }
}

export function importAccounts({formData, role}) {
    if(role === "student") {
        return dispatch => {
            api.importStudentAccount(formData).then(res => {
                dispatch(importAccountsSucceeded(res.data))
            })
        }
    } else {
        return dispatch => {
            api.importLecturerAccount(formData).then(res => {
                dispatch(importAccountsSucceeded(res.data))
            })
        }
    }
}

export function updateAccountSucceeded(data) {
    return {
        type: "UPDATE_ACCOUNT_SUCCEEDED",
        payload: data
    }
}

export function updateAccount({id, body}) {
    return dispatch => {
        api.updateAccount({id, body}).then(res => {
            // console.log(body)
            // console.log(res)
            // ! flowing
            dispatch(updateAccountSucceeded({
                id: id,
                param: body
            }))
        })
    }
}