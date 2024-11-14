const upload = require("../config/multer-config");
const cloudinary = require("../config/cloudinary-config");

module.exports = async (req, res, next) => {
  try {
    const uploader = async (path) =>
      await cloudinary.uploader.upload(path, {
        folder: "emprendedoras",
      });

    if (!req.files || req.files.length === 0) {
      //return res.status(400).json({ error: 'No files were uploaded' });
      return next();
    }

    Promise.all(
      Object.values(req.files).map(async (file) => {
        return await uploader(file[0].path);
      })
    )
      .then((resp) => {
        req.imageUrls = resp.map((img) => {
          return {
            name: img.original_filename,
            file: img.secure_url,
          };
        });

        next();
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading images" });
  }
};
