import { showHome } from './home.js';
import { showCreate } from './create.js';
import { showEdit } from './edit.js';
import { showDetails } from './details.js';
import { showLogin } from './login.js';
import { showRegister } from './register.js';

import { checkUserNav, onLogout } from './util.js';
import { render } from './dom.js';


document.querySelector('nav').addEventListener('click', onNavigate);

const sections = {
    'home': showHome,
    'create': showCreate,
    'edit': showEdit,
    'details': showDetails,
    'login': showLogin,
    'register': showRegister,
    'logout': onLogout
}


checkUserNav();

// Start application in home view
goTo('home');

function onNavigate(event) {
    if (event.target.tagName == 'A') {
        const viewName = event.target.id;

        if (goTo(viewName)) {
            event.preventDefault();
        }
    }
}

function goTo(viewName) {
    const view = sections[viewName];

    if (typeof view == 'function') {
        view({
            render,
            goTo,
            checkUserNav
        });

        return true;
    } else {
        return false;
    }
}