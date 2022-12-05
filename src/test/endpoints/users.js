import axios from 'axios'
import {
    PROTOCOL,
    HOST,
    PORT
} from '../../config/constant.js'

const URL = `${PROTOCOL}://${HOST}:${PORT}`

export const getCurrentUser = async () => {
    const urlRequest = `${URL}/api/users/currentUser`
    const response = await axios.get(urlRequest)
    return response.data
}