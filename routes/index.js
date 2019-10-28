const UserRoute = require('./user')
const PasswordManagerRoute = require('./password')
module.exports = {
  user: UserRoute,
  passwordManager: PasswordManagerRoute
}
