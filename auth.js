const bcrypt = require('bcrypt')
const User = require('./model/User')

exports.authenticate = function(username, password) {
  return new Promise(async function(resolve, reject) {
    try {
      const user = await User.findOne({ username })
      const passwordMatch = bcrypt.compareSync(password, user.password)
      if (passwordMatch) {
        resolve({
          status: 200,
          payload: {
            uid: user._id,
            user: username
          }
        })
      } else {
        reject({
          status: 401,
          payload: {
            message: 'Invalid password.'
          }
        })
      }
    } catch (err) {
      reject({
        status: 404,
        payload: {
          message: 'User not found.'
        }
      })
    }
  })
}
