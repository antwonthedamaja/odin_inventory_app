const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.jpg' && ext !== '.png'&& ext !== '.jpeg') return cb(new Error('Invalid image extension.'));
  cb(null, true);
};

exports.multer = multer({ storage: storage, fileFilter: fileFilter });

exports.persistFile = (name, imageBuffer) => {
  const filePath = path.join(__dirname, '..', 'public', 'images', `${name}.jpg`);
  fs.writeFileSync(filePath, imageBuffer);
}

exports.deleteFile = (name) => {
  fs.unlinkSync(path.join(__dirname, '..', 'public', 'images', `${name}.jpg` ));
}