const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, err => {
  if (!err) {
    return console.log('Database Connected!')
  }
})

module.exports = { mongoose }
