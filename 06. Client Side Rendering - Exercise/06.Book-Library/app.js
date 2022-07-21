import { showCreateForm } from "./views/create.js";
import { showHome } from "./views/home.js";

async function bookStore() {
    showHome();
    showCreateForm();
}

bookStore();