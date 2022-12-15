import axios from 'axios'
import {
    PROTOCOL,
    HOST_LOCAL,
    PORT
} from '../../config/constant.js'

const URL = `${PROTOCOL}://${HOST_LOCAL}:${PORT}`

export const getCurrentUser = async () => {
    const urlRequest = `${URL}/api/users/currentUser`
    const response = await axios.get(urlRequest)
    return response.data
}