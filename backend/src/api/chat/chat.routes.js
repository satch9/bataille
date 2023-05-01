const express = require('express');
const router = express.Router({ mergeParams: true });
const chatController = require('./chat.controller');

router.get('/', chatController.getChats);
router.post('/', chatController.createChat);

module.exports = router;