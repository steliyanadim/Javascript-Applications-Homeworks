import { getUserPosts } from "../../api/data.js"
import { html } from "../../api/lib.js"

const catalogTemplate = (items) => html` 
<section id="dashboard-page">
    <h1 class="title">My Posts</h1>
    ${items.length != 0 ? 
    html`<div class="all-posts">${items.map(cardCatalogTemplate)}</div>`:
    html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
</section>`

const cardCatalogTemplate = (item) => html`
<div class="post">
    <h2 class="post-title">${item.title}</h2>
    <img class="post-image" src="${item.imageUrl}" alt="Material Image">
    <div class="btn-wrapper">
        <a href="/${item._id}" class="details-btn btn">Details</a>
    </div>
</div>
`
export async function showUserPosts(ctx){
    const items = await getUserPosts(ctx.user._id);
    ctx.render(catalogTemplate(items));
}