import axios from 'axios'
import logger from './logService'
import { toast } from 'react-toastify'

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

axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY
 

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.defaults.headers.post['Content-Type'] = 'application/json'

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}
