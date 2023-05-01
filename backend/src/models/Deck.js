const _ = require('lodash');
const Card = require('./Card');

class Deck {
    constructor(nbreCartes) {
        this.cards = _.shuffle(_.range(nbreCartes).map(n => Card.fromNumber(n)))
    }

    draw(n) {
        return n ? _.times(n, () => this.cards.pop()) : this.cards.pop();
    }
}

module.exports = Deck;