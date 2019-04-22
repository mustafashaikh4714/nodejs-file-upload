const upload = require('../utils/mongodbFileUpload')
module.exports = app => {
  app.post('/upload', upload.single('file'), (req, res) => {
    res.send({
      success: true,
      message: `file ${req.file} is uploaded successfully`
    })
  })
}
