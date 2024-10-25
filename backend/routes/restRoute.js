const express = require('express');
const router = express.Router();

const {restController} = require('../controllers/restController');

router.post('/', restController);

module.exports = router;