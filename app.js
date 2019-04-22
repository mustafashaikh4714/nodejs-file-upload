require('dotenv').config()
const conn = require('./config/database')

const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 4000

let gfs

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
)

require('./routes/index')(app)
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))

module.exports = { app, gfs }
