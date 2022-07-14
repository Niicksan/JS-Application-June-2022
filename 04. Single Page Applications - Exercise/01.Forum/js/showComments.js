import { get } from './api.js'

export async function showComments() {
    const comments = await get('/comments');

    console.log(comments);

    const div = document.createElement('div');
}