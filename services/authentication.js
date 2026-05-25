const jwt = require('jsonwebtoken');
const SECRET_KEY = "FuckMYEMOTION";

function generateToken(user) {

    let payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    };
    const token = jwt.sign(
        payload, 
        SECRET_KEY, 
        { expiresIn: 60 * 60*24 }
    );
    return token;
}

function verifyToken(token) {
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        return payload;
    } catch (err) {
        console.error("Token verification failed:", err);
        return null;
    }   
}

module.exports = {
    generateToken,
    verifyToken
}