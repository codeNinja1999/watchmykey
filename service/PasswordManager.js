const Password = require('../model/Password')
const Cryptr = require('cryptr')
const auth = require('../auth')
const getTitleAndFavicon = require('../helpers/getTitleAndFavicon')
async function create(data, req) {
  const { uid, user } = req
  const { secretKey, entry } = data
  const { url, username, password } = entry

  try {
    await auth.authenticate(user, secretKey)
    const titleAndFavicon = await getTitleAndFavicon(url)
    const newPasswordEntry = new Password({
      uid,
      url,
      username,
      password,
      options: {
        title: titleAndFavicon.title,
        favicon: titleAndFavicon.favicon
      }
    })

    newPasswordEntry.password = crypt(secretKey, password)

    const resp = await newPasswordEntry.save()
    return {
      status: 200,
      payload: {
        ...resp._doc
      }
    }
  } catch (err) {
    return err
  }
}

async function list(uid) {
  const list = await Password.find({ uid })
  return {
    status: 200,
    payload: {
      data: list
    }
  }
}

async function edit(params, data) {
  const { _id } = params
  const { secretKey, entry } = data
  if (entry.password) {
    entry.password = crypt(secretKey, entry.password)
  }

  await Password.updateOne(
    { _id },
    { ...entry, updated_at: Date.now().toString() }
  )

  return {
    status: 200,
    payload: {
      message: 'Password updated.'
    }
  }
}

async function show(params) {
  const { _id } = params
  const password = await Password.findById(_id)
  return {
    status: 200,
    payload: {
      data: password
    }
  }
}

async function remove(params) {
  const { _id } = params
  await Password.deleteOne({ _id })
  return {
    status: 200,
    payload: {
      message: 'Password deleted.'
    }
  }
}

function crypt(secretKey, text, type = 'encrypt') {
  const cryptr = new Cryptr(secretKey)
  if (type === 'encrypt') {
    return cryptr.encrypt(text)
  } else {
    return cryptr.decrypt(text)
  }
}

module.exports = {
  create,
  list,
  edit,
  show,
  remove,
  crypt
}
