import { render, page } from './lib.js';
import { homeView } from './views/home.js';
import { dashboardView } from './views/dashboard.js';
import { detailsView } from './views/details.js';
import { createView } from './views/create.js';
import { editView } from './views/edit.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { navbarView } from './views/navbar.js';


const main = document.querySelector('main');

page(decorateContext);
page('/', homeView);
page('/dashboard', dashboardView);
page('/offer/:id', detailsView);
page('/create', createView);
page('/edit/:id', editView);
page('/login', loginView);
page('/register', registerView);

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