import { get, post, put, del } from "./api.js";

export async function getAllOffers() {
    return get('/data/offers?sortBy=_createdOn%20desc');
}

export async function getOfferById(id) {
    return get('/data/offers/' + id);
}

export async function createOffer(data) {
    return post('/data/offers', data);
}

export async function editOffer(id, data) {
    return put('/data/offers/' + id, data);
}

export async function deleteOffer(id) {
    return del('/data/offers/' + id);
}

export async function applyForOffer(data) {
    return post('/data/applications', data);
}

export async function geApplicationsPerOffer(offerId) {
    return get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
}

export async function getApplicationsPerUser(offerId, userId) {
    return get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}