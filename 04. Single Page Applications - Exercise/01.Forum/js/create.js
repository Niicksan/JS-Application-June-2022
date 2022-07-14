import { post } from './api.js';
import { showComments } from './showComments.js';
import { createSubmitHandler } from './util.js';


const form = document.querySelector('form');
const input = {
    topicName: document.getElementById('topicName'),
    username: document.getElementById('username'),
    postText: document.getElementById('postText')
}

document.querySelector('.cancel').addEventListener('click', clear);

createSubmitHandler(form, createComment);

async function createComment({ topicName, username, postText }) {
    await post('/data/movies', { topicName, username, postText });

    clear();
    showComments();
}

function clear(event) {
    event.preventDefault();

    input.topicName.value = '';
    input.username.value = '';
    input.postText.value = '';
}