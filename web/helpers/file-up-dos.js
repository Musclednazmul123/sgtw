import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import fs from 'fs';
dotenv.config();

const S3_BUCKET_ENDPOINT = process.env.S3_BUCKET_ENDPOINT || 'nyc3.digitaloceanspaces.com';
const S3_BUCKET_KEY = process.env.S3_BUCKET_KEY || 'DO00L6VHCM6UJH393BVY';
const S3_BUCKET_SECRET = process.env.S3_BUCKET_SECRET || 'qUq6x/fg1t75qarPWEUFbtU7pvSlXreeoOEFGjJCtn4';
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || 'sgtw';

const s3BucketEndpoint = new AWS.Endpoint(S3_BUCKET_ENDPOINT);

const s3 = new AWS.S3({
  endpoint: s3BucketEndpoint,
  accessKeyId: S3_BUCKET_KEY,
  secretAccessKey: S3_BUCKET_SECRET,
});

export const uploadFileToS3 = ({ fileName, contentType, destination }) => {
  const buffer = fs.readFileSync(destination);
  const ACL = 'public-read';
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: S3_BUCKET_NAME,
        Key: fileName,
        ACL: ACL,
        Body: buffer,
        ContentType: contentType,
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          data.Url = `https://${S3_BUCKET_NAME}.${S3_BUCKET_ENDPOINT}/${fileName}`;
          resolve(data);

          // Uncommend this incase you want to get files with ACL = private
          // s3.getSignedUrl("getObject", { Bucket: process.env.S3_BUCKET_NAME, Key: fileName }, (err, url) => {
          //     if (err) {
          //         reject(err);
          //     } else {
          //         resolve({ Url: url, Etag: data.ETag });
          //     }
          // })
        }
      }
    );
  });
};

//delete files from digital ocean

export async function deletefiles3(fileUrl) {
  const myarr = fileUrl.split('/');
  const mykey = myarr[myarr.length - 1];
  const bucketParams = { Bucket: S3_BUCKET_NAME, Key: mykey };
  try {
    s3.deleteObject(bucketParams, function (error, data) {
      if (error) {
        res.status({ error: 'Something went wrong' });
      }
      console.log('Successfully deleted file', data);
    });

    return;
  } catch (err) {
    console.log('Error', err);
  }
}

// //image upload to shopify
// export async function imgupload(client, file, productId) {
//   console.log(file.filename);
//   try {
//     const stage = await uploadFileToS3({
//       fileName: file.filename,
//       contentType: file.mimetype,
//       destination: file.path,
//     });
//     console.log(stage.Url);

//     fs.unlinkSync(file.path);
//     // return;
//     const imageUpdate = `mutation {
//       productCreateMedia(
//       media: {
//         alt: "image",
//         mediaContentType: IMAGE,
//         originalSource: "${stage.Url}",
//       },
//       productId: "${productId}") {
//         media {
//           alt
//           mediaContentType
//           status
//         }
//       }
//     }`;

//     const image = await client.query({
//       data: {
//         query: imageUpdate,
//       },
//     });

//     return image;
//   } catch (err) {
//     console.log(err);
//   }
// }
