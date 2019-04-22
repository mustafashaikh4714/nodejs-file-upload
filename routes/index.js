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
}
