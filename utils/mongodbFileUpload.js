const GridfsStorage = require('multer-gridfs-storage')

const storage = new GridfsStorage({
  url: process.env.DATABASE_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketname: 'uploads'
      }

      resolve(fileInfo)
    })
  }
})

const upload = multer({ storage })
export default upload
