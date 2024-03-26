import multer from "multer";
import {existsSync, mkdirSync} from "node:fs";

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    try {
      if (!existsSync(process.env.UPLOADS_DIR)) {
        mkdirSync(process.env.UPLOADS_DIR);
      }
    } catch (err) {
      console.error(err);
    }
    next(null, process.env.UPLOADS_DIR);
  },
  filename: function (req, file, next) {
    const fileSplit = file.originalname.split('.');
    const fileFormat = fileSplit[fileSplit.length - 1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    next(null, file.fieldname + '-' + uniqueSuffix + '.' + fileFormat)
  }
})

const upload = multer({
  storage: storage,
  limits: {fileSize: 2 * 1024 * 1024},
  fileFilter: (req, file, next) => {
    const formats = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/svg+xml'
    ]
    if (formats.includes(file.mimetype)) {
      next(null, true);
    } else {
      next('Netinkamas failo formatas');
    }
  }
});

export default upload;
