const boom=require('@hapi/boom')
const multer = require("multer");

// store the image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/products");
  },
  filename: (req, file, cb) => {
    console.log(req.body)
    const name = `${file.fieldname}-${Date.now()}-cover.jpeg`;
    cb(null, name);
  },
});

// filter uploaded files
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(boom.badData("Not an image! Please upload only images."),false);
  }
};

const upload = multer({ storage: storage, fileFilter: multerFilter });

exports.uploadCoverImage = upload.single("imageCover");