const Chat = require('../models/Chat');

async function getChats(req, res, next) {
    try {
        const chats = await Chat.find({ game: req.params.gameId });
        res.json(chats);
    } catch (err) {
        next(err);
    }
}

async function createChat(req, res, next) {
    try {
        const chat = new Chat({
            game: req.params.gameId,
            message: req.body.message,
            sender: req.body.sender,
        });
        await chat.save();
        res.status(201).json(chat);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getChats,
    createChat,
};
