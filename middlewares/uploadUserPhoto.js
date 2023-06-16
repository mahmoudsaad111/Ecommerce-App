const multer = require("multer")
const boom = require("@hapi/boom")

// store the image in disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users")
  },
  filename: (req, file, cb) => {
    const name = `user-${req.user.id}-${Date.now()}.jpeg`
    cb(null, name)
  },
})

// filter the file and accept only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb(boom.badData("Not an image! Please upload only images."), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
})

// upload middleware
exports.uploadPhoto = upload.single("photo")
