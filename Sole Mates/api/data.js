import { get, del, post, put } from './api.js';

export function getAllItems() {
    return get('/data/shoes?sortBy=_createdOn%20desc');
}

export function addItem(data) {
    return post('/data/shoes', data);
}

export function getItemById(id) {
    return get('/data/shoes/' + id);
}
export function deleteItem(id) {
    return del('/data/shoes/' + id)
}

export function editItem(id, data) {
    return put(`/data/shoes/${id}`, data);
}