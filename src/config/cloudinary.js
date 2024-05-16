// import { v2 as cloudinary } from "cloudinary";
// import { config } from "dotenv";
// import { local_config } from "./config";
// config();

// cloudinary.config({
//   cloud_name: local_config.CLOUD_NAME,
//   api_key: local_config.CLOUDINARY_API_KEY,
//   api_secret: local_config.CLOUDINARY_API_SECRET,
// });

// export const uploads = (file, folder) => {
//   return new Promise((resolve, reject) => {
//     console.log({ file });
//     cloudinary.uploader
//       .upload(file, {
//         resource_type: "auto",
//         folder: folder,
//       })
//       .then((result) => {
//         resolve({
//           url: result.url,
//           id: result.public_id,
//         });
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
