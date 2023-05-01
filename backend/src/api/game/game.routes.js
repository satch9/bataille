const express = require('express');
const router = express.Router();
const gameController = require('./game.controller');

router.get('/:id', gameController.getGame);
router.post('/', gameController.createGame);
router.put('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);

module.exports = router;
