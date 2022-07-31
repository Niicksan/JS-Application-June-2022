import { render, page } from './lib.js';
//import { getUserData } from './util.js';
import { dashboardView } from './views/dashboard.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { profileView } from './views/profile.js';
import { navbarView } from './views/navbar.js';


//document.getElementById('logoutBtn').addEventListener('click', onLogout);
const main = document.querySelector('.container');

page(decorateContext);
page('/', dashboardView);
page('/furniture/:id', detailsView);
page('/edit/:id', editView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/profile', profileView);

// Start Application
navbarView();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = navbarView;

    next();
}

function renderMain(templateResult) {
    render(templateResult, main);
}