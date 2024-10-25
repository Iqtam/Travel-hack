const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage engine with user-specific folders
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req)
    const albumId = req.body.albumId;
    const userId = req.body.userId;

    // Create user folder if it doesn't exist
    const userFolder = `uploads/${userId}`;
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    // Create album folder within user's folder
    const albumFolder = `${userFolder}/${albumId}`;
    if (!fs.existsSync(albumFolder)) {
      fs.mkdirSync(albumFolder, { recursive: true });
    }

    cb(null, albumFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Naming convention
  }
});

const upload = multer({ storage: storage });


const {uploadController} = require('../controllers/uploadController');

router.post('/',upload.single('image'), uploadController);

module.exports = router;