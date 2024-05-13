import multer from 'multer';

const DIR = "./public/uploads/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalExtension = file.originalname.split(".").pop();
    const uniqueFilename =
      file.fieldname + "-" + uniqueSuffix + "." + originalExtension;
    cb(null, uniqueFilename);
  },
});

// const fileFilter = (req, file, cb) => {
//   if (!file.originalname.match(/\.(jpg|jpeg|png|svg|webp)$/)) {
//     return cb(new Error("Please upload a valid image file"));
//   }
//   cb(undefined, true);
// };

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 4000 },
  // fileFilter: fileFilter,
});
