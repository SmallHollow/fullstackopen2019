require('dotenv').config()

let port = process.env.PORT
let mongodb_uri = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  mongodb_uri = process.env.TEST_MONGODB_URI
}

module.exports = {
  mongodb_uri,
  port
}
