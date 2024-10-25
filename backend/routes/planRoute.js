const express = require('express');
const router = express.Router();

const {planController} = require('../controllers/planController');

router.post('/', planController);

module.exports = router;