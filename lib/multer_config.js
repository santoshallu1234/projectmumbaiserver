const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.resolve( __dirname, "../public"),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // Extracting the file extension from the original file name
    const ext = path.extname(file.originalname);

    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

upload = multer({ storage: storage });

module.exports = upload;
