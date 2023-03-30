import { deleteGame, getById, createComments, allComments } from "../../api/data.js";
import { html, nothing } from "../../api/lib.js";
import { createSubmitHandler } from "../util.js";

const detailsTemplate = (game, hasUser, isOwner, onDelete, onComment, allComents) => html`
        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">
        
                <div class="game-header">
                    <img class="game-img" src="${game.imageUrl}" />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>
        
                <p class="text">${game.summary}</p>
        
                <div class="details-comments">
                    <h2>Comments:</h2>
                    ${allComents.length != 0 ? html`<ul>${allComents.map(commentTemplate)}</ul>` : html`<p class="no-comment">No
                        comments.</p>`}
                </div>
        
                ${isOwner ? html`
                <div class="buttons">
                    <a href="/edit/${game._id}" class="button">Edit</a>
                    <a @click=${onDelete}href="javascript:void(0)" class="button">Delete</a>
                </div>`
        : nothing}
            </div>
            >
            ${hasUser && !isOwner ? html`
            <article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${createSubmitHandler(onComment, game._id)} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
            </article>`
        : nothing}
        </section>
      `
const commentTemplate = (data) => html`
        <li class="comment">
            <p>${data.comment}</p>
        </li>
      `

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const game = await getById(id);
    const hasUser = Boolean(ctx.user);
    const isOwner = hasUser && game._ownerId == ctx.user._id;

    console.log(game);
    ctx.render(detailsTemplate(game, hasUser, isOwner, onDelete, onComment, await allComments(id)));
    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this game?');

        if (choice) {
            await deleteGame(id);
            ctx.page.redirect('/');
        }
    }
    // async function onComment(event) {
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
    //     const data = Object.fromEntries(formData);
    //     document.querySelector('.create-comment .form').reset();
    //     await createComments({ gameId: id, comment: data.comment });
    //     ctx.render(detailsTemplate(game, hasUser, isOwner, onDelete, onComment, await allComments(id)));

    // }
}