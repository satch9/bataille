const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

// @route POST api/auth
// @desc Authenticate user & get token
// @access Public
router.post('/', authController.authenticate);

module.exports = router;
