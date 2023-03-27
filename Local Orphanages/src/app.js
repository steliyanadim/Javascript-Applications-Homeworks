import { page, render } from "../api/lib.js";
import { showCatalog } from "./views/catalog.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showDetails } from "./views/detail.js";
import { showCreate } from "./views/create.js";
import { showEdit } from "./views/edit.js";
import { getUserData } from "./util.js";
import { updateNav } from "./views/nav.js";
import { showUserPosts } from "./views/userPosts.js";

const main = document.querySelector('main');

page(decorateContext);
page('/', showCatalog);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/userPosts', showUserPosts)
page('/:id', showDetails);
page('/edit/:id',showEdit);


updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    const user = getUserData();
    if(user){
        ctx.user = user;
    }
    next()
}
function renderMain(content) {
    render(content, main);
}
