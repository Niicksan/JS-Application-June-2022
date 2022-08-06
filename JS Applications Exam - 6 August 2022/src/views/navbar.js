import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/users.js";


const nav = document.querySelector('header');

const navbarTemplate = (isUser) => html`
<!-- Navigation -->
<a id="logo" href="/"><img id="logo-img" src="../images/logo.jpg" alt="" /></a>

<nav>
    <div>
        <a href="/dashboard">Dashboard</a>
    </div>

    ${isUser ? html`
    <!-- Logged-in users -->
    <div class="user">
        <a href="/create">Create Offer</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
    </div>` : html`
    <!-- Guest users -->
    <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
</nav>`;

export function navbarView() {
    const userData = getUserData();
    const isUser = userData?.email;
    render(navbarTemplate(isUser), nav);
}

function onLogout() {
    logout();
    navbarView();
    page.redirect('/dashboard');
}