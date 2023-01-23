import { extname } from 'path';
import { diskStorage } from 'multer';

export const uploadStorage = diskStorage({
  destination: './files',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${extname(file.originalname)}`);
  },
});
