const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PasswordManagerSchema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    required: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  options: {
    type: Object,
    required: true
  },
  created_at: {
    type: String,
    default: Date.now().toString()
  },
  updated_at: {
    type: String,
    default: ''
  }
})

const PasswordManagerModel = mongoose.model('password', PasswordManagerSchema)
module.exports = PasswordManagerModel
