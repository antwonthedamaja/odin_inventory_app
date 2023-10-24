const path = require('path');
const multer = require('multer');
const fs = require('fs/promises');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.jpg' && ext !== '.png'&& ext !== '.jpeg') return cb(new Error('Invalid image extension.'));
  cb(null, true);
};

exports.multer = multer({ storage: storage, fileFilter: fileFilter });

exports.persistFile = async (name, imageBuffer) => {
  const filePath = path.join(__dirname, '..', 'public', 'images', `${name}.jpg`);
  return await fs.writeFile(filePath, imageBuffer);
}

exports.deleteFile = async (name) => {
  return await fs.unlink(path.join(__dirname, '..', 'public', 'images', `${name}.jpg` ));
}