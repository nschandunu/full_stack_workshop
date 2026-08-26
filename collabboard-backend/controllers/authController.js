const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserStore = require('../models/User');

const SALT_ROUNDS = 10;

/** Sign a JWT for a given user id */
function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // --- Validation ---
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    // --- Duplicate check ---
    if (UserStore.findByEmail(email)) {
      return res.status(409).json({ error: 'An account with that email already exists.' });
    }

    // --- Hash & persist ---
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = UserStore.create({ name, email, passwordHash });

    const token = signToken(user.id);

    res.status(201).json({
      token,
      user: UserStore.toPublic(user),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required.' });
    }

    const user = UserStore.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = signToken(user.id);

    res.json({
      token,
      user: UserStore.toPublic(user),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/auth/me  (protected — requires valid JWT)
 */
const getMe = (req, res) => {
  res.json({ user: UserStore.toPublic(req.user) });
};

module.exports = { register, login, getMe };
