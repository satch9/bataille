const _ = require('lodash');
const Deck = require('./Deck');

// Enum pour les états de la partie
const GAME_STATES = {
    WAITING: 'waiting',
    STARTED: 'started',
    ROUND_OVER: 'round_over',
    GAME_OVER: 'game_over'
};

class Game {
    constructor(id, numCards) {
        this.id = id;
        this.players = [];
        this.numCards = numCards;
        this.deck = new Deck(this.numCards);
        this.turn = null;
        this.round = 0;
        this.roundWinner = null;
        this.gameWinner = null;
        this.state = GAME_STATES.WAITING;
    }

    // Ajouter un joueur à la partie
    addPlayer(player) {
        //console.log("player", player)
        if (this.players.length < 2) {
            this.players.push(player);
        } else if (this.players.length == 2) {
            throw new Error('Le nombre de joueurs maximum est atteint');
        }
    }

    // Retirer un joueur de la partie
    removePlayer(playerId) {
        this.players = _.reject(this.players, { id: playerId });
    }

    // Distribuer les cartes aux joueurs
    deal() {
        this.players.forEach(player => {
            player.hand = this.deck.draw(this.numCards / 2);
            player.score = 0;
        });
        this.state = GAME_STATES.STARTED;
    }

    getCardFromPlayer(player) {
        return player.hand.shift();
    }

    // Passer au tour suivant
    nextTurn() {
        const currentIndex = _.findIndex(this.players, { id: this.turn });
        if (currentIndex === this.players.length - 1) {
            this.turn = this.players[0].id;
        } else {
            this.turn = this.players[currentIndex + 1].id;
        }
    }

    // Déterminer le gagnant d'un tour
    getRoundWinner() {
        const card1 = _.last(this.players[0].hand);
        const card2 = _.last(this.players[1].hand);
        if (card1.value > card2.value) {
            this.roundWinner = this.players[0].id;
            this.players[0].score += 1;
        } else if (card1.value < card2.value) {
            this.roundWinner = this.players[1].id;
            this.players[1].score += 1;
        } else {
            this.roundWinner = null;
        }
        this.round += 1;
        this.state = GAME_STATES.ROUND_OVER;
    }

    // Déterminer le gagnant de la partie
    getGameWinner() {
        const player1Score = this.players[0].score;
        const player2Score = this.players[1].score;
        if (player1Score > player2Score) {
            this.gameWinner = this.players[0].id;
        } else if (player1Score < player2Score) {
            this.gameWinner = this.players[1].id;
        }
        this.state = GAME_STATES.GAME_OVER;
    }

    // effacer les données de la partie
    reset() {
        this.deck = new Deck(this.numCards);
        this.turn = null;
        this.round = 0;
        this.roundWinner = null;
        this.gameWinner = null;
        this.state = GAME_STATES.WAITING;
        this.players.forEach(player => {
            player.hand = [];
            player.score = 0;
        });
    }
}

module.exports = {
    Game,
    GAME_STATES
};