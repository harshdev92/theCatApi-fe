import http from './httpService'
const apiEndpoint = '/images/search?limit=100'

export function getCats() {
    return http.get(apiEndpoint)
}

export function uploadCat(image: File) {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'cat-images')
    return http.post('/images/upload', data)
}
