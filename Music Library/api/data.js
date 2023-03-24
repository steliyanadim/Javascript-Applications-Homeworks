import { get, del, post, put } from './api.js';

export function getAllAlbums() {
    return get('/data/albums?sortBy=_createdOn%20desc');
}

export function createAlbum(albumData) {
    return post('/data/albums', albumData);
}

export function getById(id) {
    return get('/data/albums/' + id);
}

export function deleteAlbum(id){
    return del('/data/albums/' + id);
}

export function editAlbum(id, data){
    return put('/data/albums/' + id, data);
}

export function addLike(data){
    return post('/data/likes', data);
}

export function getTotalLikes(albumId){
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}

export function getUserTotalLikes(albumId, userId){
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}