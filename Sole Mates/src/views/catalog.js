import { getAllItems } from "../../api/data.js";
import { html } from "../../api/lib.js";

const catalogTemplate = (items) => html`
    <section id="dashboard">
          <h2>Collectibles</h2>
          ${items.length != 0 ? 
        html`<ul class="card-wrapper">${items.map(itemCardTemplate)}</ul>`:
        html`<h2>There are no items added yet.</h2>`}
    </section>`
    
    const itemCardTemplate = (item) =>html`
    <li class="card">
              <img src="${item.imageUrl}" alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${item.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${item.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
              <a class="details-btn" href="/catalog/${item._id}">Details</a>
            </li>
    `
export async function showCatalog(ctx){
    const items = await getAllItems();
    ctx.render(catalogTemplate(items));
}