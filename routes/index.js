const upload = require('../utils/mongodbFileUpload')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const conn = require('../config/database')

module.exports = app => {
  // Init gfs
  let gfs
  conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
  })

  // upload single file.
  app.get('/upload', (req, res) => {
    res.render('index')
  })
  app.post('/upload', (req, res) => {
    upload(req, res, err => {
      if (err) return res.status(400).send(err.message)
    })
    res.send({
      success: true,
      message: `file ${req.file} is uploaded successfully`
    })
  })

  // get all files
  app.get('/files', async (req, res) => {
    let files = await gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        })
      }
      return res.json(files)
    })
  })
  // display original file in the browser.
  app.get('/files/:filename', async (req, res) => {
    let file = await gfs.files.findOne({ filename: req.params.filename })
    if (!file) {
      res.status(400).send({ message: ' No file exist!' })
    }

    const readStream = gfs.createReadStream(file.filename)
    readStream.pipe(res)
  })

  app.delete('/files/:id', async (req, res) => {
    let removedFile = await gfs.remove({ _id: req.params.id, root: 'uploads' })
    if (!removedFile) return res.status.send({ message: "can't remove file!" })

    return res.send({
      message: `file ${removedFile} from the database successfully.`
    })
  })
}
