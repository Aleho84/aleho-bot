import logger from '../utils/logger.js'
import { usersDao } from '../daos/index.js'
import { readUser } from '../utils/readUser.js'

export const login = (req, res) => {
  try {
    res.status(200).json({
      message: `User ${req.user.email} successfully logged in`,
      id: req.user._id,
      email: req.user.email,
      token: req.user.token
    })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: err.message, line: err.line })
  }
}

export const loginError = (req, res) => {
  try {
    res.status(401).json({ message: `login error` })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: err.message, line: err.line })
  }
}

export const signin = (req, res) => {
  try {
    res.status(201).json({
      message: 'Registered user successfully',
      id: req.user._id,
      email: req.user.email,
      token: req.user.token
    })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: err.message, line: err.line })
  }

}

export const signinError = (req, res) => {
  try {
    res.status(500).json({ message: 'Signin error' })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: err.message, line: err.line })
  }
}

export const logout = (req, res) => {
  try {
    if (readUser(req).name === 'Anonymous') { 
      const msg = `[USERS]: Can not closed anonymous session`
      logger.info(msg)
      res.status(400).json({ message: msg })
      return
    }

    req.session.destroy((err) => {
      if (err) {
        const msg = '[USERS]: Failed to log out'
        logger.warn(msg)
        return res.status(500).json({ message: msg })
      }
      const msg = `[USERS]: Closed session ${req.user.email}`
      logger.info(msg)
      res.status(200).json({ message: msg })
    })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: err.message, line: err.line })
  }
}

export const currentUser = (req, res) => {
  try {
    if (req.user) {
      const { name, lastname, image, email } = req.user
      res.status(200).json({ name, lastname, email, image })
    } else {
      res.status(200).json({ name: 'Anonymous' })
    }
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: err.message, line: err.line })
  }
}

export const deleteUser = async (req, res) => {
  try {
    console.log('entro')
    const userDeleted = await usersDao.delete(req.params.id)
    userDeleted
      ? res.status(200).json({
        message: 'User deleted successfully',
        cart: userDeleted
      })
      : res.status(404).json({ message: `User not found. ID:${req.params.id}` })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: err.message, line: err.line })
  }
}