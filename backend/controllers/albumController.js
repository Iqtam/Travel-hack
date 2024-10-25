const fs = require("fs");
const path = require("path");

// Function to get all image files from the specified user album directory
const getImagesFromAlbum = (userId, albumId) => {
  return new Promise((resolve, reject) => {
    // Ensure userId and albumId are strings
    // if (typeof userId !== "string" || typeof albumId !== "string") {
    //   return reject(new Error("Invalid userId or albumId"));
    // }

    // Construct the directory path
    const directoryPath = path.join(__dirname, "uploads", userId, albumId); // Adjust __dirname as necessary

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return reject(err);
      }

      // Filter for image files (jpg, jpeg, png, gif, etc.)
      const imageFiles = files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return (
          ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif"
        );
      });

      // Read and encode image files as base64
      const imagePromises = imageFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const filePath = path.join(directoryPath, file);
          fs.readFile(filePath, (err, data) => {
            if (err) {
              return reject(err);
            }
            const base64Image = data.toString("base64");
            resolve(
              `data:image/${path.extname(file).slice(1)};base64,${base64Image}`
            );
          });
        });
      });

      Promise.all(imagePromises)
        .then((images) => resolve(images))
        .catch(reject);
    });
  });
};

module.exports = { getImagesFromAlbum };
