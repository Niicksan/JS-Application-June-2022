import { post } from './api.js';
import { createSubmitHandler } from './util.js';


const section = document.getElementById('add-movie');
const form = section.querySelector('form');

createSubmitHandler(form, onSubmit);

section.remove();
let ctx = null;

export function showCreate(inCtx) {
    ctx = inCtx;
    ctx.render(section);
}

async function onSubmit({ title, description, img }) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (title == '' || description == '' || !img) {
        return alert('All fields are required!');
    }

    const { _id } = await post('/data/movies', { title, description, img, userId: userData.id });
    ctx.checkUserNav();
    ctx.goTo('home');
}