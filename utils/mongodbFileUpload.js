const GridfsStorage = require('multer-gridfs-storage')
const multer = require('multer')

// storage engine for multer to store uploaded files directly to mongodb.
const storage = new GridfsStorage({
  url: process.env.DATABASE_URL,
  file: (req, file) => {
    return {
      bucketName: 'uploads',
      filename: file.originalname
    }
  }
})

const upload = multer({ storage }).single('file')
module.exports = upload
