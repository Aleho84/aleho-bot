import pkg from 'jsonwebtoken'
const { sign, verify } = pkg
import { readUser } from '../utils/readUser.js'

import { PRIVATE_KEY } from '../config/constant.js'

export const tokenGenerate = function (user) {
    const jwt = sign(
        { data: user },
        PRIVATE_KEY,
        { expiresIn: '1d' }
    )
    return jwt
}

export const auth = function (req, res, next) {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']

    if (!authHeader) {
        return res.status(401).json({ message: `Unauthorized` })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: `Unauthorized` })
    }

    try {
        req.user = verify(token, PRIVATE_KEY)
    } catch (error) {
        return res.status(401).json({ message: `Unauthorized` })
    }

    next()
}