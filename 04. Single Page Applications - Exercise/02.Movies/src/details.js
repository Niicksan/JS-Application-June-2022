import { get, post } from './api.js'
import { showView, spinner } from './util.js';


const section = document.getElementById('movie-example');

export function detailsPage(id) {
    showView(section);
    displayMovie(id);
}

async function displayMovie(id) {
    section.replaceChildren(spinner());
    const user = JSON.parse(sessionStorage.getItem('userData'));

    const [movie, likes, ownLike] = await Promise.all([
        getMovie(id),
        getLikes(id),
        getOwnLike(id, user)
    ]);

    section.replaceChildren(createMovieCard(movie, user, likes, ownLike));
}

function createMovieCard(movie, user, likes, ownLike) {
    const element = document.createElement('div');
    element.className = 'container';
    element.innerHTML = `
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>
        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.img}" alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${createControls(movie, user, ownLike)}
            <span class="enrolled-span">Liked ${likes}</span>
        </div>
    </div>`;

    const likeBtn = element.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id));
    }

    const editBtn = element.querySelector('.btn-warning');
    if (editBtn) {
        editBtn.addEventListener('click', (e) => editMovie(e, movie._id));
    }

    return element;
}

function createControls(movie, user, ownLike) {
    const isOwner = user && user.id == movie._ownerId;

    let controls = [];

    if (isOwner) {
        controls.push('<a class="btn btn-danger" href="#">Delete</a>');
        controls.push('<a class="btn btn-warning" href="#">Edit</a>');
    } else if (user && ownLike == false) {
        controls.push('<a class="btn btn-primary like-btn" href="#">Like</a>');
    }
    controls.push();

    return controls.join('');
}

async function getMovie(id) {
    const movie = await get(`/data/movies/${id}`);

    return movie;
}

async function getLikes(id) {
    const likes = await get(`/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);

    return likes;
}

async function getOwnLike(movieId, user) {
    if (!user) {
        return false;
    } else {
        const userId = user._id;
        const like = await get(`/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);

        return like.length > 0;
    }
}

async function likeMovie(e, movieId) {
    e.preventDefault();

    await post(`/data/likes/`);
    detailsPage(movieId);
}