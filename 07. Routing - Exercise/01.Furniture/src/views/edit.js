import { editFurniture, getFurnitureDetails } from "../api/catalog.js";
import { html } from "../lib.js";


const editTemplate = (onSubmit, item) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" .value=${item.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model" .value=${item.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year" .value=${item.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description"
                    .value=${item.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" .value=${item.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" .value=${item.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`;

export async function editView(ctx) {
    const item = await getFurnitureDetails(ctx.params.id);
    ctx.render(editTemplate(onSubmit, item));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const make = formData.get('make').trim();
        const model = formData.get('model').trim();
        const description = formData.get('description').trim();
        const year = formData.get('year').trim();
        const price = formData.get('price').trim();
        const img = formData.get('img').trim();
        const material = formData.get('material').trim();

        if (!make || !model || !year || !price || !img) {
            return alert('All fields are required!');
        }

        if (make.length < 4 || model.length < 4) {
            return alert('Make and Model must be at least 4 symbols!');
        }

        if (Number(year) < 1950 || year > 2050) {
            return alert('Please enter at year between 1950 and 2050!');
        }

        if (description.length < 10) {
            return alert('Description must be at least 10 symbols!');
        }

        if (price < 0) {
            return alert('The price must be grater then 0!');
        }

        await editFurniture({ make, model, description, year, price, img, material }, ctx.params.id);
        event.target.reset();
        ctx.page.redirect('/furniture/' + ctx.params.id);
    }
}