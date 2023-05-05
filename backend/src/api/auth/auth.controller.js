const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/database');

async function authenticate(req, res) {
    const { username, password } = req.body;
    console.log("username", username);
    console.log("password", password)
    try {

        db.get('SELECT * FROM player WHERE username = ?', [username], async (err, row) => {
            if (err) {
                return res.status(401).json({ msg: 'First Invalid credentials' });
            }
            if (!row) {
                return res.status(401).json({ msg: 'Row Invalid credentials' });
            }
            const isMatch = await bcrypt.compare(password, row.password);
            if (!isMatch) {
                return res.status(401).json({ msg: 'IsMatch Invalid credentials' });
            }
            const payload = {
                player: {
                    id: row.id,
                    username: row.username,
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, player: { id: row.id, username: row.username } });
                }
            );
        });


    } catch (err) {
        console.error("message d'erreur général", err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    authenticate
};
