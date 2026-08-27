const jwt = require('jsonwebtoken');
const UserStore = require('../models/User');

/**
 * protect — verifies the Bearer JWT and attaches req.user.
 * Usage: router.get('/me', protect, controller)
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authorised. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = UserStore.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Not authorised. User no longer exists.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Not authorised. Invalid or expired token.' });
  }
};

module.exports = { protect };
