import { html, render } from '../node_modules/lit-html/lit-html.js';
import { repeat } from '../node_modules/lit-html/directives/repeat.js';
import { getAllBooks } from '../data/books.js';
import { showEditForm } from './edit.js';
import { del } from '../data/api.js';

const body = document.querySelector('body');

const homeTemplate = (onLoad) => html`
<button id="loadBooks" @click="${onLoad}">LOAD ALL BOOKS</button>
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>

    </tbody>
</table>

<div id="form"></div>
`;

export function showHome() {
    render(homeTemplate(showBooks), body);
}

export function showBooks() {
    const tbody = document.querySelector('tbody');

    const booksTemplate = (books) => html`
        ${repeat(books, b => b[0], bookList)}
    `;

    const bookList = (book) => html`
    <tr data-id="${book[0]}">
        <td>${book[1].title}</td>
        <td>${book[1].author}</td>
        <td>
            <button @click="${editBook}">Edit</button>
            <button @click="${deleteBook}">Delete</button>
        </td>
    </tr>
    `;

    loadAllBooks();

    async function loadAllBooks() {
        const books = Object.entries(await getAllBooks());

        render(booksTemplate(books), tbody);
    }

    function editBook(event) {
        const id = event.target.parentNode.parentNode.dataset.id;
        showEditForm(id);
    }

    async function deleteBook(event) {
        const id = event.target.parentNode.parentNode.dataset.id;
        await del(id);
        showBooks();
    }
}