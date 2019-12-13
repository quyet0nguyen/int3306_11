import axios from 'axios'

const API_BASE_URL = 'http://localhost:5555/api/v1'

const client = axios.create({
    baseURL: API_BASE_URL,
    header: {
        'Content-Type': 'application/json',
    }
})

const clientForm =  axios.create({
    baseURL: API_BASE_URL,
    header: {
        'Content-Type': 'multipart/form-data',
    }
})

/**
 * Account api
 */
export function fetchAccounts() {
    return client.get('/account/accounts')
}

export function createAccount(payload) {
    return client.post('/account', payload)
}

export function importStudentAccount(payload) {
    return clientForm.post('/account/import/students', payload)
}
export function importLecturerAccount(payload) {
    return clientForm.post('/account/import/lecturers', payload)
}

export function updateAccount(payload) {
    return client.put('/account/' + payload.id, payload.body);
}

export function deleteccount(payload) {
    return client.delete('/account/' + payload.id)
}

/**
 * Room api
 */

export function fetchRooms() {
    return client.get('/room/rooms')
}

export function createRoom(payload) {
    return client.post('/room', payload)
}

export function importRoom(payload) {
    return clientForm.post('/room/import', payload)
}

export function updateRoom(payload) {
    return client.put('/room/' + payload.id, payload.body)
}

export function deleteRoom(payload) {
    return client.get(`/room/${payload.id}`)
}

/**
 * Class section api
 */

export function fetchClassSection() {
    return client.get('/class-section/class-sections')
}

export function createClassSection(payload) {
    return client.post('/class-section', payload)
}

export function imporClassSection(payload) {
    return clientForm.post('/class-section/import', payload)
}

export function updateClassSection(payload) {
    return client.put(`/class-section/${payload.id}`, payload.body)
}

export function deleteClassSection(payload) {
    return client.get(`/class-section/${payload.id}`)
}

/**
 * Room api
 */


/**
 * Request Form api
 */