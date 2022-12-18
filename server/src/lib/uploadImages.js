const cloudinary = require('../config/cloudinary');

async function uploadImages(images) {
  const uploadedImages = [];
  const imagePromises = images.map((image) => cloudinary.uploader.upload(image.path));
  const imageResponses = await Promise.all(imagePromises);

  imageResponses.forEach((image, imageIndex) => {
    uploadedImages.push({
      url: image.secure_url,
      cloudinaryId: image.public_id,
      name: images[imageIndex].originalname,
    });
  });

  return uploadedImages;
}

module.exports = uploadImages;
