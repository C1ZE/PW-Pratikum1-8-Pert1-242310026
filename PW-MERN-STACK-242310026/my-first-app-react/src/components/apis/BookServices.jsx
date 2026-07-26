import { RequestAPI } from '@/hooks/RequestAPI'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URI;
const getToken = () => (typeof window !== "undefined" ? localStorage.getItem('accessToken') : null);

const GET_ALL_BOOK = () => {
    const HEADERS = {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('GET', `${API_URL}/api/books`, HEADERS)
}

const CREATE_BOOK = (payload) => {
    const HEADERS = {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
    }
    return RequestAPI('POST', `${API_URL}/api/books`, HEADERS, payload)
}

const GET_BOOK_BY_ID = (book_id) => {
    const HEADERS = {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('GET', `${API_URL}/api/books/${book_id}`, HEADERS)
}

const UPDATE_BOOK = (book_id, payload) => {
    const HEADERS = {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
    }
    return RequestAPI('PUT', `${API_URL}/api/books/${book_id}`, HEADERS, payload)
}

const DELETE_BOOK = (book_id) => {
    const HEADERS = {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('DELETE', `${API_URL}/api/books/${book_id}`, HEADERS)
}

export { GET_ALL_BOOK, GET_BOOK_BY_ID, CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK }
