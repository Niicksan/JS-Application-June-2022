import { logout } from "../api/users.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";

const nav = document.querySelector('nav');

const navbarTemplate = (isUser) => html`
    ${isUser ? html`<a id="catalogLink" href="/">Dashboard</a>
    <div id="user">
        <a id="createLink" href="/create">Create Furniture</a>
        <a id="profileLink" href="/profile">My Publications</a>
        <a @click=${onLogout} id="logoutBtn" href="javascript:void(0)">Logout</a>
    </div>`
    : html`<a id="catalogLink" href="/">Dashboard</a>
    <div id="guest">
        <a id="loginLink" href="/login" class="active">Login</a>
        <a id="registerLink" href="/register">Register</a>
    </div>`}
`;

export function navbarView() {
    const userData = getUserData();
    const isUser = userData?.email;
    render(navbarTemplate(isUser), nav);
}

function onLogout() {
    logout();
    navbarView();
    page.redirect('/');
}