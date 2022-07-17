import { get } from './api.js';


const navUser = Array.from(document.getElementsByClassName('nav-item user'));
const guestUser = Array.from(document.getElementsByClassName('nav-item guest'));

const userData = JSON.parse(sessionStorage.getItem('userData'));

export function checkUserNav() {
    if (userData != null) {
        document.getElementById('welcome-msg').textContent = `Welcome, ${userData.email}`;

        navUser.forEach(e => e.style.display = 'inline-block');
        guestUser.forEach(e => e.style.display = 'none');

    } else {
        navUser.forEach(e => e.style.display = 'none');
        guestUser.forEach(e => e.style.display = 'inline-block');
    }
}

export function onLogout(ctx) {
    get('/users/logout');

    sessionStorage.removeItem('userData');

    ctx.checkUserNav();
    ctx.goTo('home');
}

export function createSubmitHandler(form, callback) {
    form.addEventListener('submit', onSubmit);

    function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);
        callback(Object.fromEntries([...formData.entries()]));
    }
}