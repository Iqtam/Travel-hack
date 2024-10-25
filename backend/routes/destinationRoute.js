const express = require('express');
const router = express.Router();

const {destinationController,getDestinationById} = require('../controllers/destinationcontroller.js');

router.post('/', destinationController);
router.get('/:id', getDestinationById);

module.exports = router;