import { get } from "./api.js";

export async function getAllAnimals() {
    return get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
}

export async function getAnimalById(id) {
    return get('/data/pets/' + id);
}