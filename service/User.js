const User = require('../model/User')
const bcrypt = require('bcrypt')
const auth = require('../auth')
const jwt = require('jsonwebtoken')
const config = require('../config')
const passwordManager = require('./PasswordManager')

async function login(data) {
  const { username, password } = data

  try {
    const user = await auth.authenticate(username, password)
    const token = await jwt.sign(user.payload, config.app.SECRET_KEY)
    const { header, payload } = await jwt.decode(token, { complete: true })
    return {
      status: user.status,
      payload: {
        header,
        payload,
        token
      }
    }
  } catch (err) {
    return err
  }
}

async function register(data) {
  const { username, email, password } = data

  const UsernameExist = await AlreadyExist('username', username)
  const EmailExist = await AlreadyExist('email', email)

  if (UsernameExist) {
    return {
      status: 403,
      payload: {
        message: 'Username already exist.'
      }
    }
  }

  if (EmailExist) {
    return {
      status: 403,
      payload: {
        message: 'Email already exist.'
      }
    }
  }

  const newUser = new User({
    username,
    email,
    password
  })

  newUser.password = hash(password)

  await newUser.save()

  return {
    status: 201,
    payload: {
      message: 'User registered.'
    }
  }
}

async function change_password(data) {
  const { password, newPassword } = data.body
  const { uid, user } = data

  try {
    await auth.authenticate(user, password)
    await User.updateOne({ _id: uid }, { password: hash(newPassword) })

    // Change all saved passwords
    const allPasswords = await passwordManager.list(uid)
    const { data } = allPasswords.payload
    if (data) {
      data.map(async pass => {
        pass.password = passwordManager.crypt(
          password,
          pass.password,
          'decrypt'
        )
        await passwordManager.edit(
          { _id: pass._id },
          {
            secretKey: newPassword,
            entry: {
              password: pass.password
            }
          }
        )
      })
    }

    return {
      status: 200,
      payload: {
        message: 'Account password changed.'
      }
    }
  } catch (err) {
    return err
  }
}

async function AlreadyExist(field, value) {
  return (await User.findOne({ [field]: value })) || false
}

function hash(text) {
  const salt = bcrypt.genSaltSync(14)
  const hash = bcrypt.hashSync(text, salt)
  return hash
}

module.exports = {
  login,
  register,
  change_password
}
