import http from './httpService'

export function getCats() {
    return http.get('/images?limit=100')
}

export function uploadCat(image: File) {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'cat-images')
    return http.post('/images/upload', data)
}

export function upVoteCat(id: string) {
    let body = { image_id: id, value: 1 }
    return http.post(`/votes`, body)
}

export function downVoteCat(id: string) {
    let body = { image_id: id, value: -1 }
    return http.post(`/votes`, body)
}

export function getVotes() {
    return http.get(`/votes`)
}

export function updateFavorite(id: string) {
    return http.post(`/favourites`, { image_id: id })
}

export function getFavourites() {
    return http.get(`/favourites`)
}

export function deleteFavourite(id: string) {
    return http.delete(`/favourites/${id}`)
}
