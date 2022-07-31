import { get, post, put, del } from "./api.js";

export async function getAllFurniture() {
    return get('/data/catalog');
}

export async function getFurnitureDetails(id) {
    return get('/data/catalog/' + id);
}

export async function createFurniture(data) {
    return post('/data/catalog', data);
}

export async function editFurniture(data, id) {
    return put('/data/catalog/' + id, data);
}

export async function deleteFurniture(id) {
    return del('/data/catalog/' + id);
}

export async function getFurnitureByUser(userId) {
    return get(`/data/catalog?where=_ownerId%3D%22${userId}%22`);
}