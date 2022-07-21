import { html, render } from '../node_modules/lit-html/lit-html.js';
import { post } from '../data/api.js';
import { load } from './home.js';

const createTemplate = (onSubmit) => html`
<form id="add-form" @submit=${onSubmit}>
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>`;

export function showCreateForm() {
    const form = document.getElementById('form');

    render(createTemplate(onSubmit), form);

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        await post({ title: formData.get('title'), author: formData.get('author') });
        event.target.reset();
        load();
    }
}