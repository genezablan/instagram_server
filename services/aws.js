const aws = require('aws-sdk');
require('dotenv').config();
aws.config.update({ region: process.env.AWS_REGION });
const multerS3 = require('multer-s3');
const multer = require('multer');

const s3 = new aws.S3({ httpOptions: { timeout: 120000 } });

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const limits = {
  files: 5,
  fileSize: 10 * 1024 * 1024,
};

const upload = multer({
  limits,
  storage: multerS3({
    s3,
  bucket: process.env.AMAZON_S3_BUCKET,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, `${Date.now()}-${name}`);
    },
  }),
}).array('files');


module.exports = {
  upload
}
