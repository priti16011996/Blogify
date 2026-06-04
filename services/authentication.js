const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  let payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 60 * 24 });
  return token;
}

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
