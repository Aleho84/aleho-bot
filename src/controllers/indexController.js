import packageJson from '../../package.json' assert {type: "json"}
import logger from '../utils/logger.js'
import { readUser } from '../utils/readUser.js'

export const getIndexPage = (req, res) => {
  res.render('index', { title: packageJson.name.toUpperCase(), user: readUser(req) })
}

export const getLoginPage = (req, res) => {
  res.render('login', { user: readUser(req) })
}

export const getSigninPage = (req, res) => {
  res.render('signin', { user: readUser(req) })
}

export const getLoginFail = (req, res) => {
  res.render('loginfail', { user: readUser(req) })
}

export const getSigninFail = (req, res) => {
  res.render('signinfail', { user: readUser(req) })
}

export const getLogout = (req, res) => {
  if (readUser(req).name === 'Anonymous') { return }

  req.session.destroy((err) => {
    if (err) {
      const msg = 'Failed to log out'
      logger.warn(msg)
    } else if (req.user.email) {
      const msg = `Closed session ${req.user.email}`
      logger.info(msg)
    }
  })

  res.redirect('/')
}

export const deleteUser = async (req, res) => {
  const userDeleted = await api.delete(req.params.id)
  userDeleted
    ? res.status(200).json({
      message: 'User deleted successfully',
      user: userDeleted
    })
    : res.status(404).json({ message: `User not found. ID:${req.params.id}` })
}

export const getLogger = (req, res) => {
  res.render('logger', { user: readUser(req) })
}