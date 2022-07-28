import { get, post, put, del } from "./api.js";

export async function getAllBooks() {
    return get('/data/books?sortBy=_createdOn%20desc');
}

export async function getBooksByUser(userId) {
    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getBookById(id) {
    return get('/data/books/' + id);
}

export async function createBook(book) {
    return post('/data/books', book);
}

export async function updateBook(id, book) {
    return put('/data/books/' + id, book);
}

export async function deleteBook(id) {
    return del('/data/books/' + id);
}