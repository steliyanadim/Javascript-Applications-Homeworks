import { get, del, post, put } from './api.js';

export function getAllItmes(){
    return get('/data/posts?sortBy=_createdOn%20desc');
}

export function createPost(data){
    return post('/data/posts', data);
}

export function getById(id){
    return get('/data/posts/' + id);
}

export function deleteItem(id){
    return del('/data/posts/' + id);
}

export function editPost(id, data){
    return put(`/data/posts/${id}`, data);
}

export function getUserPosts(userId){
    return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export function makeDonation(data){
    return post('/data/donations', data);
}

export function getTotalDonations(postId){
    return get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}

export function getUserTotalDonations(postId, userId){
    return get (`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

}