import {getById, deleteItem, getTotalDonations, getUserTotalDonations, makeDonation} from "../../api/data.js";
import { html, nothing } from "../../api/lib.js";

const detailsTemplate = (item, hasUser, isOwner, onDelete,onDonate, totalDonations, hasDonated) => html`
        <section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="${item.imageUrl}" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${item.title}</h2>
                        <p class="post-description">${item.description}</p>
                        <p class="post-address">${item.address}</p>
                        <p class="post-number">${item.phone}</p>
                        <p class="donate-Item">Donate Materials: ${totalDonations}</p>

                        <div class="btns">
                            ${hasUser && !isOwner && !hasDonated?  html`<a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>`:nothing}
                            ${isOwner ? html`
                            <a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`:nothing}
                        </div>
                    </div>
                </div>
            </div>
        </section>
      `




export async function showDetails(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    const userId = ctx.user._id
    const hasUser = Boolean(ctx.user);
    const isOwner = hasUser && item._ownerId == ctx.user._id;
    	
    const totalDonations = await getTotalDonations(id);
    const hasDonated = Boolean(await getUserTotalDonations(id, userId));

    ctx.render(detailsTemplate(item, hasUser,isOwner,onDelete,onDonate, totalDonations, hasDonated));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this album?');

        if (choice){
            await deleteItem(id);
            ctx.page.redirect('/');
        }
    }
    async function onDonate(){
        await makeDonation({ postId : id});

        document.querySelector('.donate-Item').textContent = `Donate Materials: ${await getTotalDonations(id)}`
        document.querySelector('.donate-btn').style.display = 'none';
    }
}