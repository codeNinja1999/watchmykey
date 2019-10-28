const mongoose = require("mongoose")
const config = require("./config")

exports.onConnect = function(callback) {
  if (callback) {
    const db =
      config.app.NODE_ENV === "production"
        ? config.mongo.PROD_DB
        : config.mongo.LOCAL_DB
    mongoose
      .connect(db, {
        useNewUrlParser: true
      })
      .then(callback, err => {
        throw new Error(err.message)
      })
    callback
  } else {
    throw new Error("No callback function found")
  }
}
