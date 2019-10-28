const express = require('express')
const router = express.Router()
const token = require('../middleware/checkToken')
const passwordManager = require('../service/PasswordManager')
router.post('/create', token.checkToken, async function(req, res) {
  const response = await passwordManager.create(req.body, req)
  if (response.status !== 200) {
    res.statusMessage = response.payload.message
  }
  res.status(response.status).json(response.payload)
})

router.get('/list', token.checkToken, async function(req, res) {
  const response = await passwordManager.list(req.uid)
  if (response.status !== 200) {
    res.statusMessage = response.payload.message
  }
  res.status(response.status).json(response.payload)
})

router.get('/show/:_id', token.checkToken, async function(req, res) {
  const response = await passwordManager.show(req.params)
  if (response.status !== 200) {
    res.statusMessage = response.payload.message
  }
  res.status(response.status).json(response.payload)
})

router.delete('/delete/:_id', token.checkToken, async function(req, res) {
  const response = await passwordManager.remove(req.params)
  if (response.status !== 200) {
    res.statusMessage = response.payload.message
  }
  res.status(response.status).json(response.payload)
})

router.put('/edit/:_id', token.checkToken, async function(req, res) {
  const response = await passwordManager.edit(req.params, req.body)
  if (response.status !== 200) {
    res.statusMessage = response.payload
  }
  res.status(response.status).json(response.payload)
})

module.exports = router
