exports.validate = (req, res, next) => {
  if (req.is('application/json') || req.method === 'GET') {
    next()
  } else {
    return res.status(406).json({
      message: 'Not Acceptable'
    })
  }
}
