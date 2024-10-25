const express = require('express');
const router = express.Router();
const {getImagesFromAlbum} = require('../controllers/albumController.js');

router.get('/:userId/:albumId/images', getImagesFromAlbum);

module.exports = router;