import { logout } from "../api/users.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";

const nav = document.querySelector('nav');

const navbarTemplate = (isUser) => html`
<section class="logo">
    <img src="./images/logo.png" alt="logo">
</section>
<ul>
    <!--Users and Guest-->
    <li><a href="/">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    ${isUser ? html`
    <!--Only Guest-->
    <li><a href="/create">Create Postcard</a></li>
    <li><a @click=${onLogout} id="logoutBtn" href="javascript:void(0)">Logout</a></li>`
        : html`
    <!--Only Users-->
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>`}
</ul>`;

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