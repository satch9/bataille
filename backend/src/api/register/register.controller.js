const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/database');

async function register(req, res) {
    const { username, email, password, confirm } = req.body;
    console.log("username backend register", username)
    console.log("email backend register", email)
    console.log("password backend register", password)
    console.log("passwordConfirm backend register", confirm)
    // verify if the user already exists
    // if yes, return an error
    // if no, create the user
    try {
        db.get('SELECT * FROM player WHERE username = ?', [username], async (err, row) => {
            if (err) {
                return res.status(401).json({ msg: 'First Invalid credentials' });
            }
            if (row) {
                return res.status(401).json({ msg: 'Row Invalid credentials' });
            }
            if (password !== confirm) {
                return res.status(401).json({ msg: 'Les mots de passe ne correspondent pas' });
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            console.log("hash", hash)
            db.run('INSERT INTO player (username,email, password) VALUES (?, ?, ?)', [username, email, hash], (err) => {
                if (err) {
                    return res.status(401).json({ msg: "Erreur lors de l'enregsitrement en base de données" });
                }
                res.status(200).json({ msg: 'Utilisateur enregistré' });
                /* const payload = {
                    player: {
                        username: username,
                        email: email,
                    }
                };
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                ); */
            });
        });
    } catch (err) {
        console.error("message d'erreur général", err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    register
};