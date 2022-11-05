import axios from 'axios'
import logger from './logService'
import { ToastContainer, toast } from 'react-toastify'

axios.interceptors.response.use(undefined, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500

    if (!expectedError) {
        logger.log(error)
        toast.error('An unexpected error occurrred.')
    }

    return Promise.reject(error)
})

axios.defaults.headers.common['x-api-key'] =
    ' live_2sIxW4mr1DD16Ekoe4F4zxXAFlKzP2tvfM0t5KLIM3mdBAfVx1ScER4981E5IQPX '

axios.defaults.baseURL = 'https://api.thecatapi.com/v1'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}
