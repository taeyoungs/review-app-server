import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const multerUserThumbnail = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'youngs-wetube/userThumbnail',
  }),
});

export const uploadUserThumbnail = multerUserThumbnail.single('thumbnail');

export const deleteThumbnail = (req, res, next) => {
  if (req.user.profile.thumbnail !== 'default') {
    const params = {
      Bucket: 'youngs-wetube/userThumbnail',
      Key: req.user.profile.thumbnailKey,
    };

    s3.deleteObject(params, function (err, data) {
      if (err) console.log(err);
      else next();
    });
  } else {
    next();
  }
};
