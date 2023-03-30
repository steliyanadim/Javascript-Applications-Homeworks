import { setUserData ,clearUserData} from "../src/util.js";
import { post ,get} from "../api/api.js";



export async function login(email, password) {
    const {_id, email: resultEmail, accessToken} = await post('/users/login', { email, password });

    setUserData({
        _id,
        email: resultEmail,
        accessToken
    });
}

export async function register(email, password) {
    const { _id, email: resultEmail, accessToken } = await post('/users/register', { email, password });

    setUserData({
        _id,
        email: resultEmail,
        accessToken
    });
}

export async function logout() {
    get('/users/logout');
    clearUserData();
}