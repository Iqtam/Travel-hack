const express = require('express');
const router = express.Router();

const {cityController} = require('../controllers/cityController.js');

router.post('/', cityController);

module.exports = router;