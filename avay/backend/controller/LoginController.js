const UserModel = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

HASH_KEY = dotenv.parsed.HASH_KEY;
const login = async (req, res) => {

    const { email, password } = req.body;
    // console.log(email);
    try {
        const user = await UserModel.UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const passwordMatch = bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password!' });
        }
        UserModel.PresenceRecord.create({ userId: user._id, name: user.name });

        // console.log(user.name)
        const token = jwt.sign({ userId: user._id, uname: user.name }, HASH_KEY);
        res.json({ status: 200, token, uname: user.name });


    } catch (err) {
        console.log(err);
    }

}

// Logout Controller
const activeSessions = new Map();
const logout = async (req, res) => {
    // console.log("dfnjdf",req.headers.authorization);
    try {
        const token = req.headers.authorization;

        // Verify and decode the token
        jwt.verify(token, HASH_KEY, async (err, decoded) => {
            if (err) {
                // Handle invalid or expired token
                console.error('Token verification failed:', err);
                // Respond with an error message
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const userId = decoded.userId;
            console.log('User ID:', userId);
            const presenceRecord = await UserModel.PresenceRecord.findOneAndUpdate(
                { userId: userId, logoutTime: null },
                // Update the logoutTime to the current date
                { $set: { logoutTime: new Date(), islogin: false } },
                // Return the updated document
                { new: true }
            );
            if (!presenceRecord) {
                return res.status(404).json({ error: 'No active session found' });
            }
               res.json({ status: 200, message: 'Logout successful' });
        });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }

    }





module.exports = { login, logout }