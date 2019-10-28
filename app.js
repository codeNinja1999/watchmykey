const config = require('./config')
const consoler = require('./helpers/consoler')
const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const path = require('path')

const requestMiddleware = require('./middleware/validRequest')
const routes = require('./routes')
const database = require('./database')

const app = express()

if (config.app.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')))
}

app.use(bp.json())
app.use(cors())
app.use(requestMiddleware.validate)
app.use('/api/user', routes.user)
app.use('/api/pm', routes.passwordManager)

database.onConnect(() => {
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })

  app.listen(config.app.PORT, function() {
    consoler('Server is up and running on port ' + config.app.PORT)
  })
})
