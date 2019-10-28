const ct = require('../middleware/checkToken')
const config = require('../config')
function op(token) {
  const _o = ct.checkTokenTest(token)
  console.log(_o)
}
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZDM0NmFjNjI4NmM3ZjFmZThjMjk0MGQiLCJpYXQiOjE1NjM3MjAzMDd9.PgP6ggfB_O03u-1KbLBEzOUEm8bj7PIka-QYKzvzkrM'
op(token)
