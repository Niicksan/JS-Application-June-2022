import { post } from './api.js'
import { showDetails } from './details.js';


const section = document.getElementById('homeView');
section.querySelector('div.topic-title').addEventListener('click', showDetails);
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
section.querySelector('.cancel').addEventListener('click', clearForm);
const container = section.querySelector('.topic-container');

section.remove();

export async function showComments(ev) {
    ev?.preventDefault();
    document.getElementById('main').replaceChildren('Loading...');

    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const posts = await res.json();

    container.replaceChildren(...Object.values(posts).map(createPostPreview));

    document.getElementById('main').replaceChildren(section);
}

function createPostPreview(post) {
    const element = document.createElement('div');
    element.className = 'topic-name-wrapper';
    element.innerHTML = `
    <div class="topic-name">
        <a href="/details" class="normal" id="${post._id}">
            <h2>${post.title}</h2>
        </a>
        <div class="columns">
            <div>
                <p>Date: <time>${post.dateCreated}</time></p>
                <div class="nick-name">
                    <p>Username: <span>${post.username}</span></p>
                </div>
            </div>


        </div>
    </div>`;

    return element;
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('topicName').trim();
    const username = formData.get('username').trim();
    const content = formData.get('postText').trim();

    if (title == '' || username == '' || content == '') {
        alert('All fields are required!');
    }

    const tweet = {
        title,
        username,
        content,
        dateCreated: new Date()
    };

    await post('/posts', tweet);

    form.reset();
    showComments();
}

function clearForm(event) {
    event.preventDefault();
    form.reset();
}