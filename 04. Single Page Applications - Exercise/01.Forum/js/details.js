import { get, post } from './api.js'


const section = document.getElementById('detailsView');
const postElement = {
    title: document.getElementById('details-title'),
    username: document.getElementById('details-username'),
    time: document.getElementById('details-time'),
    content: document.getElementById('details-content'),
};

const commentsList = document.getElementById('user-comment');

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

section.remove();


export function showDetails(ev) {
    let target = ev.target;

    if (target.tagName == 'H2') {
        target = target.parentElement;
    }
    if (target.tagName == 'A') {
        ev.preventDefault();

        const postId = target.id;
        showPost(postId);
    }
}

async function showPost(postId) {
    document.getElementById('main').replaceChildren('Loading...');

    const post = await get('/posts/' + postId);
    const comments = await get('/comments/');

    commentsList.replaceChildren(...Object
        .values(comments)
        .filter(c => c.postId == postId)
        .map(createCommentElement));

    form.id = postId;
    postElement.title.textContent = post.title;
    postElement.username.textContent = post.username;
    postElement.time.textContent = post.dateCreated;
    postElement.content.textContent = post.content;

    document.getElementById('main').replaceChildren(section);
}

function createCommentElement(comment) {
    const element = document.createElement('div');
    element.className = 'topic-name-wrapper';
    element.innerHTML = `
    <div class="topic-name">
        <p><strong>${comment.username}</strong> commented on <time>${comment.dateCreated}</time></p>
        <div class="post-content">
            <p>${comment.content}</p>
        </div>
    </div>`;

    return element;
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);

    const username = formData.get('username').trim();
    const content = formData.get('postText').trim();
    const postId = form.id;

    if (username == '' || content == '') {
        alert('All fields are required!');
        return;
    }

    const comment = {
        username,
        content,
        postId,
        dateCreated: new Date()
    };

    await post('/comments', comment);

    form.reset();

    showPost(postId);
}