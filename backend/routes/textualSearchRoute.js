const express = require('express');
const router = express.Router();

const {textualSearchController} = require('../controllers/textualSearchController');

router.post('/textualSearch', textualSearchController);

module.exports = router;