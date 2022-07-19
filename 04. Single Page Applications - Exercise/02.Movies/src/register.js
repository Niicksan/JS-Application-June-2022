import { post } from './api.js';
import { showView } from './util.js';


const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function registerPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    if (email == '' || password == '') {
        return alert('All fields are required!');
    }
    if (password != repeatPassword) {
        return alert('Passwords don\'t match!');
    }

    const { accessToken, _id } = await post('/users/register', { email, password });
    const userData = {
        email,
        accessToken,
        id: _id
    };

    sessionStorage.setItem('userData', JSON.stringify(userData));

    updateNav();
    homePage();
}