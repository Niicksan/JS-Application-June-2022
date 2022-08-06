import { html } from "../lib.js";
import { createOffer } from "../api/offeres.js";


const createTemplate = (onSubmit) => html`
<section id="create">
    <div class="form">
        <h2>Create Offer</h2>
        <form @submit=${onSubmit} class="create-form">
            <input type="text" name="title" id="job-title" placeholder="Title" />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
            <input type="text" name="category" id="job-category" placeholder="Category" />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export function createView(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const title = formData.get('title').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const category = formData.get('category').trim();
        const description = formData.get('description').trim();
        const requirements = formData.get('requirements').trim();
        const salary = formData.get('salary').trim();

        if (!title || !imageUrl || !category || !description || !requirements || !salary) {
            return alert('All fields are required!');
        }

        await createOffer({ title, imageUrl, category, description, requirements, salary });
        event.target.reset();
        ctx.page.redirect('/dashboard');
    }
}