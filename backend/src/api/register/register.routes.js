const express = require('express');
const router = express.Router();
const registerController = require('./register.controller');

// @route POST api/register
// @desc Register user
// @access Public
router.post('/', registerController.register);

module.exports = router;