CREATE TABLE Player (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE Game (
  id INTEGER PRIMARY KEY,
  numberOfCards INTEGER NOT NULL
);

CREATE TABLE GamePlayer (
  id INTEGER PRIMARY KEY,
  gameId INTEGER NOT NULL,
  playerId INTEGER NOT NULL,
  score INTEGER NOT NULL,
  numberOfCards INTEGER NOT NULL,
  isActive BOOLEAN NOT NULL,
  turn INTEGER NOT NULL,
  nextPlayerId INTEGER NOT NULL,
  gameWinner INTEGER,
  stateOfGame TEXT,
  FOREIGN KEY (gameId) REFERENCES Game(id),
  FOREIGN KEY (playerId) REFERENCES Player(id),
  FOREIGN KEY (nextPlayerId) REFERENCES Player(id),
  FOREIGN KEY (gameWinner) REFERENCES Player(id)
);
CREATE TABLE Hand (
  id INTEGER PRIMARY KEY,
  gameId INTEGER NOT NULL,
  playerId INTEGER NOT NULL,
  cards TEXT NOT NULL,
  playedCards TEXT NOT NULL,
  FOREIGN KEY (gameId) REFERENCES Game(id),
  FOREIGN KEY (playerId) REFERENCES Player(id)
);