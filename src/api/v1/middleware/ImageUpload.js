const { GridFsStorage } = require('multer-gridfs-storage')
require('dotenv').config()
const multer = require('multer')
const storage = new GridFsStorage({
  url: process.env.DATABASE_URL,
  file: (req, file) => {
    const match = ['image/png', 'image/jpg']
    if (match.indexOf(file.mimeType) === -1) {
      return `${Date.now()}-image-${file.originalname}`
    }
    return {
      bucketName: 'images',
      filename: `${Date.now()}-image-${file.originalname}`,
    }
  },
})

module.exports = multer({ storage })
