import { post } from './api.js';
import { homePage } from './home.js';
import { showView, updateNav } from './util.js';

const section = document.querySelector('#form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function loginPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    const data = await post('/users/login', { email, password });

    const userData = {
        email: data.email,
        accessToken: data.accessToken,
        id: data._id
    };

    sessionStorage.setItem('userData', JSON.stringify(userData));

    form.reset();

    updateNav();
    homePage();
}