const express = require('express');
const router = express.Router();

const {hotel_controller} = require('../controllers/hotelController.js');

router.post('/', hotel_controller);

module.exports = router;