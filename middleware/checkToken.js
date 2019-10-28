const jwt = require('jsonwebtoken')
const config = require('../config')

exports.checkToken = async (req, res, next) => {
  let token =
    req.headers['x-access-token'] || req.headers['authorization'] || ''
  token = token.split(' ')[1]

  if (token) {
    try {
      const decoded = await jwt.verify(token, config.app.SECRET_KEY)
      req.uid = decoded.uid
      req.user = decoded.user
      next()
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } else {
    res.status(400).json({ message: 'Bad Request' })
  }
}
