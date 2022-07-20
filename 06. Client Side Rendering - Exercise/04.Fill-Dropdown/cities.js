import { get } from './api.js';


export async function getCities() {
    return get();
}