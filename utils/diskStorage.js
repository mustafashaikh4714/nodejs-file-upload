const multer = require('multer')

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const diskUpload = multer({ storage: store }).single('file')
module.exports = diskUpload
