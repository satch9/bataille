const Game = require('../models/Game');

async function getGame(req, res, next) {
    try {
        const game = await Game.findById(req.params.id)
            .populate('players')
            .populate('currentPlayer');
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game);
    } catch (err) {
        next(err);
    }
}

async function createGame(req, res, next) {
    try {
        const game = new Game(req.body);
        await game.save();
        res.status(201).json(game);
    } catch (err) {
        next(err);
    }
}

async function updateGame(req, res, next) {
    try {
        const game = await Game.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game);
    } catch (err) {
        next(err);
    }
}

async function deleteGame(req, res, next) {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json({ message: 'Game deleted' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getGame,
    createGame,
    updateGame,
    deleteGame,
};
