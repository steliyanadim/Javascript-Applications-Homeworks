import {editPost, getById} from "../../api/data.js";
import { html } from "../../api/lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (item, onEdit) => html`
<section id="edit-page" class="auth">
            <form @submit=${onEdit} id="edit">
                <h1 class="title">Edit Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title" .value=${item.title}>
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description" .value=${item.description}>
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl" .value=${item.imageUrl}>
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address" .value=${item.address}>
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone" .value=${item.phone}>
                </article>

                <input type="submit" class="btn submit" value="Edit Post">
            </form>
        </section>
`

export async function showEdit(ctx) {
    
    const id = ctx.params.id;
    const item = await getById(id);
    console.log(item);
    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));

    async function onEdit({ title,description,imageUrl,address,phone }) {
        if (title == '' || description == '' || imageUrl == '' || address == '' || phone == '') {
            return alert('All fields are required!');
        }
        await editPost(id,{
            title,
            description,
            imageUrl,
            address,
            phone
        })

        document.querySelector('#edit').reset();
        ctx.page.redirect('/' + id);
    }
}