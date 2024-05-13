const AWS = require('aws-sdk');
const fs = require('fs');
const detectContentType = require('detect-content-type');
const sharp = require('sharp');
const endpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');

const s3 = new AWS.S3({
  endpoint: endpoint,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const uploadFile = async (fileName) => {
  let fileContent;
  try {
    fileContent = fs.readFileSync(fileName);

    const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (!allowedFileTypes.includes('.' + fileExtension)) {
      console.log('File type not allowed.');
      return;
    }

    if (allowedFileTypes.includes('.' + fileExtension)) {
      fileContent = await sharp(fileContent)
        .resize({ width: 1000 })
        .jpeg({ quality: 80 })
        .toBuffer();
    }

    const ct = detectContentType(fileContent);

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ACL: "public-read",
      ContentType: ct,
    };

    s3.putObject(params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}
