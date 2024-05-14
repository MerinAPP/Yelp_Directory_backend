import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import { extname } from "path";

const spacesEndpoint = new AWS.Endpoint("ams3.digitaloceanspaces.com"); // replace with your region's endpoint
export const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const uploadFileToSpaces = (file) => {
  const contentType = extname(file.originalname).toLowerCase();
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.BUCKET_NAME, // replace with your Space name
      Key: `${uuidv4()}-${file.originalname}`, // unique name for the file
      Body: file.buffer,
      ACL: "public-read",
      ContentType: contentType,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
