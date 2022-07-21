import { html, render } from '../node_modules/lit-html/lit-html.js';
import { showCreateForm } from './create.js';
import { getBookById } from '../data/books.js';
import { put } from '../data/api.js';
import { load } from './home.js';

const editTemplate = (onSubmit, book) => html`
<form id="add-form" @submit=${onSubmit}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." value="${book.title}">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." value="${book.author}">
    <input type="submit" value="Save">
</form>`;

export async function showEditForm(id) {
    const form = document.getElementById('form');
    const book = await getBookById(id);

    render(editTemplate(onSubmit, book), form);

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        await put(id, { title: formData.get('title'), author: formData.get('author') });
        event.target.reset();
        load();
        showCreateForm();
    }
}