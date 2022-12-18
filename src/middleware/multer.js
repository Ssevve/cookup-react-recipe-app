const multer = require('multer');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') return cb(null, true);

    cb(null, false);
    return cb(new Error('Unsupported file type.'));
  },
});
