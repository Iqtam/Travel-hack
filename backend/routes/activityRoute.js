const express = require('express');
const router = express.Router();

const {activityController} = require('../controllers/activityController');

router.post('/', activityController);

module.exports = router;