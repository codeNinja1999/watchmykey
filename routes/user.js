const express = require('express')
const router = express.Router()
const user = require('../service/User')
const token = require('../middleware/checkToken')

router.post('/login', async function(req, res) {
  const response = await user.login(req.body)
  if (response.status !== 200) {
    res.statusMessage = response.payload.message
  }
  res.status(response.status).json(response.payload)
})

router.post('/register', async function(req, res) {
  const response = await user.register(req.body)
  if (response.status !== 201) {
    res.statusMessage = response.payload.message
  }
  res.status(response.status).json(response.payload)
})

router.put('/change_password', token.checkToken, async function(req, res) {
  const response = await user.change_password(req)
  res.status(response.status).json(response.payload)
})

module.exports = router
