import { RequestAPI } from '@/hooks/RequestAPI'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URI;
const getToken = () => (typeof window !== "undefined" ? localStorage.getItem('accessToken') : null);

const GET_ALL_USER = () => {
    const HEADERS = {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('GET', `${API_URL}/api/users`, HEADERS)
}

const CREATE_USER = (payload) => {
    const HEADERS = {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('POST', `${API_URL}/api/users`, HEADERS, payload)
}

const GET_USER_BY_ID = (user_id) => {
    const HEADERS = {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('GET', `${API_URL}/api/users/${user_id}`, HEADERS)
}

const UPDATE_USER = (user_id, payload) => {
    const HEADERS = {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('PUT', `${API_URL}/api/users/${user_id}`, HEADERS, payload)
}

const DELETE_USER = (user_id) => {
    const HEADERS = {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('DELETE', `${API_URL}/api/users/${user_id}`, HEADERS)
}

export { GET_ALL_USER, GET_USER_BY_ID, CREATE_USER, UPDATE_USER, DELETE_USER }
