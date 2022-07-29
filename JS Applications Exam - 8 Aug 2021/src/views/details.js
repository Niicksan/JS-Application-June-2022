import { deleteBook, getBookById } from "../api/books.js";
import { getLikesByBooks, likeBook, likedBookPerUser } from "../api/likes.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (book, likes, isOwner, isUser, isLiked, onDelete, like) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${isOwner ? html`
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            <a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="#">Delete</a>`
        : ''}

            ${isUser && !isOwner && !isLiked ? html`
            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            <a @click=${like} class="button" href="#">Like</a>`
        : ''}

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

export async function detailsView(ctx) {
    const book = await getBookById(ctx.params.id);
    const likes = await getLikesByBooks(ctx.params.id);

    const userData = getUserData();
    const isUser = userData?.email;
    const isOwner = userData?.id == book._ownerId;

    let isLiked = false;
    if (userData) {
        isLiked = await likedBookPerUser(ctx.params.id, userData.id);
    }

    ctx.render(detailsTemplate(book, likes, isOwner, isUser, isLiked, onDelete, like));

    async function onDelete() {
        const choice = confirm('Are you sure ypu want to delete this book?');

        if (choice) {
            await deleteBook(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function like() {
        await likeBook({ bookId: ctx.params.id });
        ctx.page.redirect('/books/' + ctx.params.id);
    }
}