// config/multer.js
import multer from 'multer';

const storage = multer.memoryStorage(); // store files in memory as buffer
const upload = multer({ storage });

export { upload };
