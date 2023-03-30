import { get, del, post, put } from './api.js';

export function getAllGames(){
    return get('/data/games?sortBy=_createdOn%20desc')
}

export function createGame(data){
    return post('/data/games', data)
}
export function getById(id){
    return get(`/data/games/${id}`)
}
export function editGame(id, data){
    return put(`/data/games/${id}`, data)
}
export function deleteGame(id){
    return del(`/data/games/${id}`)
}
export function allComments(gameId){
    return get(`/data/comments?where=gameId%3D%22${gameId}%22`)
}
export function createComments(data){
    return post(`/data/comments`, data)
}