const _ = require('lodash');

class Player {

    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.hand = [];
        this.score = 0
    }



    addToHand(cards) {
        this.hand.push(...cards);
    }

    clearHand() {
        this.hand = [];
    }

    addScore(points) {
        this.score += points;
    }

    resetScore() {
        this.score = 0;
    }
}

module.exports = Player;
