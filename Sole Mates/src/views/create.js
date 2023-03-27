import { addItem } from "../../api/data.js";
import { html } from "../../api/lib.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (onCreate) => html`
<section id="create">
  <div class="form">
    <h2>Add item</h2>
    <form @submit=${onCreate} class="create-form">
      <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
      <input type="text" name="model" id="shoe-model" placeholder="Model" />
      <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
      <input type="text" name="release" id="shoe-release" placeholder="Release date" />
      <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
      <input type="text" name="value" id="shoe-value" placeholder="Value" />

      <button type="submit">post</button>
    </form>
  </div>
</section>
`

export function showCreate(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate({ brand, model, imageUrl, release, designer, value }) {
    if (brand == '' || model == '' || imageUrl == '' || release == '' || designer == '' || value == '') {
      return alert('All fields are required!');
    }
    
    await addItem({
      brand,
      model,
      imageUrl,
      release,
      designer,
      value

    })

    document.querySelector('.create-form').reset();
    ctx.page.redirect('/catalog');
  }
}