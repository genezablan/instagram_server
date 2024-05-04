const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

async function upload(file) {
  const filename = file.originalname
  const params = {
      Bucket:process.env.AMAZON_S3_BUCKET,
      Key: 'uploads/' + filename,
      Body:file.buffer,
    };
  console.log('Params:', params);
  
  let uploadTask = new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
          if (err) {
            return reject(err);
          }
      
          resolve(data)
        });
  })

  return await uploadTask
}

module.exports = {
  upload
}