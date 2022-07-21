import * as api from '../data/api.js';


const endpoints = {
    books: '/books',
    bookById: '/books/',
};

export async function getAllBooks() {
    return api.get(endpoints.books);
}

export async function getBookById(id) {
    return api.get(endpoints.bookById + id);
}