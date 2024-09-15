import multer from 'multer'
import fs from 'fs'

const multerdata= multer.diskStorage({
  filename: (req, file, callback) => {
    const filename =
      Date.now() + Math.floor(Math.random() * 100) + file.originalname.replace(/ /g, "");
    callback(null, filename);
  },
  destination: (req, file, callback) => {
    if (!fs.existsSync("storage")) {
      fs.mkdirSync("storage");
    }
    callback(null, "storage");
  },
});

export default multerdata