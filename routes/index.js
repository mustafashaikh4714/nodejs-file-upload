const upload = require('../utils/mongodbFileUpload')
module.exports = (app, gfs) => {
  // upload single file.
  app.post('/upload', upload.single('file'), (req, res) => {
    res.send({
      success: true,
      message: `file ${req.file} is uploaded successfully`
    })
  })

  // get all files
  app.get('/files', async (req, res) => {
    let files = await gfs.files.find({})
    if (files.length === 0) {
      res.status(400).send({ message: ' No files found!' })
    }
    return res.send({ files })
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
    let removedFile = await gfs.remove({ _id: req.params.id })
    if (!removedFile) return re.status.send({ message: "can't remove file!" })

    return res.send({
      message: `file ${removedFile} from the database successfully.`
    })
  })
}
