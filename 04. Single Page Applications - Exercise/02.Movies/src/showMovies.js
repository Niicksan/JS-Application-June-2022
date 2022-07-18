import { get } from './api.js';


const section = document.getElementById('movie-example');
const list = section.querySelector('."movies-list');
section.remove();

export function showMovies(ctx) {
    ctx.render(section);

    list.replaceChildren('Loading...');

    const movies = await get('/data/movies');

    const fragment = document.createDocumentFragment();

    movies.map(createMovieItem).forEach(c => fragment.appendChild(c));

    container.replaceChildren(fragment);
}

function createMovieItem(movie) {

    const li = document.createElement('element ');
    li.className = 'card mb-4';
    li.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a href="/details/${movie._id}">
            <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
        </a>
    </div>`;

    const details = li.querySelector('.btn-info');
    details.addEventListener('click', (event) => {
        if (event.target.tagName == 'BUTTON') {
            event.preventDefault();
            const id = event.target.dataset.id;
            detailsPage(id);
        }
    });

    return li;
}