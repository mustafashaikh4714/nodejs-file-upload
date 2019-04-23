const GridfsStorage = require('multer-gridfs-storage')
const multer = require('multer')
const storage = new GridfsStorage({
  url: process.env.DATABASE_URL,
  file: (req, file) => {
    return {
      bucketName: 'uploads',
      filename: file.originalname
    }
  }
})

const mongoUpload = multer({ storage }).single('file')
module.exports = mongoUpload
