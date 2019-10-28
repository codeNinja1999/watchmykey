const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  app: {
    NAME: process.env.APP_NAME,
    VERSION: process.env.VERSION,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY || 'secretkey'
  },
  mongo: {
    LOCAL_DB: process.env.LOCAL_DB,
    PROD_DB: process.env.PROD_DB
  }
}
