const bcrypt = require('bcrypt');
const db = require('../../config/database');

async function getPlayers(req, res, next) {
  try {


    db.all('SELECT * FROM player', [], (err, rows) => {
      if (err) {
        return res.status(401).json({ msg: 'Invalid credentials' });
      }
      if (!rows) {
        return res.status(401).json({ msg: 'Invalid credentials' });
      }
      res.json(rows);
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}


async function getPlayer(req, res, next) {
  try {
    const { id } = req.params;
    console.log("id", id)

    db.run('SELECT * FROM player WHERE id = ?', [id], (err, row) => {
      if (err) {
        return res.status(401).json({ msg: '1 Invalid credentials' });
      }
      console.log("row", row)
      if (!row) {
        return res.status(401).json({ msg: '2 Invalid credentials' });
      }
      res.json(row);
    });

  } catch (err) {
    console.error("3 ", err.message);
    res.status(500).send('Server error');
  }
}

async function createPlayer(req, res, next) {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);

    db.run('INSERT INTO player (username, password) VALUES (?, ?)', [username, await bcrypt.hash(password, salt)], function (err) {
      if (err) {
        return res.status(401).json({ msg: 'Player not created' });
      }
      res.json({ message: 'Player created' });
    });

  } catch (err) {
    console.error("message d'erreur", err.message);
    res.status(500).send('Server error');
  }
}

async function updatePlayer(req, res, next) {
  try {
    const { username } = req.body;
    const { id } = req.params;

    db.run('UPDATE player SET username = ? WHERE id = ?', [username, id], function (err) {
      if (err) {
        return res.status(401).json({ msg: 'Player not found' });
      }
      res.json({ message: 'Player updated' });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

async function deletePlayer(req, res, next) {
  try {
    const { id } = req.params;

    db.run('DELETE FROM player WHERE id = ?', [id], function (err) {
      if (err) {
        return res.status(401).json({ msg: 'Player not found' });
      }
      res.json({ message: 'Player deleted' });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};