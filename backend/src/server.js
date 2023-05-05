// créé moi une app avec express en écoutant sur le port 4000
// puis créer moi un server pour socket.io
// et enfin créer moi un server http avec express et socket.io
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const uuid = require('uuid');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(morgan('dev'));

const socketIO = require('./config/socketIO')(app);
const db = require('./config/database');

console.log("db", db);


app.use('/api/auth', require('./api/auth/auth.routes'));
app.use('/api/player', require('./api/player/player.routes'));
app.use('/api/register', require('./api/register/register.routes'));

//console.log("socketIO", socketIO.io);

const io = socketIO.io;
const Player = require('./models/Player');
const { Game, GAME_STATES } = require('./models/Game');

const games = [];
let numCards;
let partyName;
let game;

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    // Création des deux joueurs


    const joueur3 = new Player({ id: 3, username: "J3" });
    //console.log("joueur1", joueur1);
    //console.log("joueur2", joueur2);

    socket.on('parameters', (data) => {
        console.log("data", data)
        numCards = data.numCards;
        partyName = data.partyName;

        // Création de la partie
        game = new Game(uuid.v4(), numCards, partyName);



        let joueur1 = new Player({ id: 1, username: "J1" });
        // Ajouter le joueur1 à la partie
        game.addPlayer(joueur1.id, joueur1.username);
        console.log("game", game)
        games.push(game);
        io.emit('game-created', { gameId: game.id });
    })

    socket.on('list-game-send', () => {
        socket.emit('list-game', games);
    })

    socket.on('join-game', (data) => {
        console.log("data", data)
        const game = _.find(games, { id: data.gameId });
        console.log("game", game)
        if (game && game.players.length < 2) {
            const joueur2 = new Player({ id: 2, username: "J2" });
            // Ajouter le joueur2 à la partie
            game.addPlayer(joueur2.id, joueur2.username);
            console.log("game", game)
            io.emit('game-joined', { gameId: game.id });
        } else {
            console.log("game", game)
            io.emit('game-full', { gameId: game.id });
        }
    })



    /* // Ajouter les joueurs à la partie
    
    game.addPlayer(joueur2);
    //game.addPlayer(joueur3);

    // Distribuer les cartes
    game.deal()

    // Démarrer la partie
    game.turn = joueur1.id;
    game.state = GAME_STATES.STARTED;

    // Identifier le joueur qui vient de se connecter
    const playerId = _.findKey(game.players, { id: socket.id });

    // Vérifier si les deux joueurs sont connectés et si la partie est en cours
    if (game.players.length === 2 && game.state === GAME_STATES.STARTED) {
        //envoyer les mains des deux joueurs aux clients
        io.to(game.players[0].id).emit('hand', game.players[0].hand);
        io.to(game.players[1].id).emit('hand', game.players[1].hand);

        // Ecouter les évènements de tour de jeu
        socket.on('play', () => {
            // Vérifier si c'est bien le tour du joueurs
            if (game.turn === playerId) {
                io.to(socket.id).emit('message', 'C\'est votre tour');
                return;
            }
            const card = game.getCardFromPlayer(game.players[playerId - 1]);

            // Envoyer la carte jouée à tous les clients
            io.emit('cardPlayed', { card, playerId });

            // Passer au tour suivant
            game.nextTurn();

            // Vérifier si le tour est terminé
            if (game.turn === joueur1.id) {
                game.getRoundWinner();

                // Envoyer le gagnant du tour à tous les clients
                io.emit('roundWinner', game.roundWinner);

                // Vérifier si la partie est terminée
                if (game.state === GAME_STATES.GAME_OVER) {
                    // Envoyer le gagnant de la partie à tous les clients
                    io.emit('gameWinner', game.gameWinner);
                } else {
                    // Sinon distribuer les cartes pour le tour suivant
                    game.deal();
                    io.emit('hand', game.players[0].hand, game.players[1].hand);
                }
            }
        });
    } */

    // Ecouter les évènements de déconnexion des clients
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
        //game.removePlayer(playerId);

        // Vérifier si la partie est en cours
        if (game && game.state && game.state === GAME_STATES.STARTED) {
            // Arrêter la partie et envoyer un message à tous les clients
            game.state = GAME_STATES.GAME_OVER;
            io.emit('message', 'Un joueur s\'est déconnecté');
            io.emit('gameStopped')
        }

    });
});

const PORT = process.env.PORT || 4000;

socketIO.server.listen(`${PORT}`, () => {
    console.log('server is listening on port 4000');
});
