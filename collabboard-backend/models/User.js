/**
 * In-memory User store (replaces MongoDB for Milestone 2).
 * Week 3 (Milestone 3) will swap this out for a Mongoose model.
 *
 * Shape: { id, name, email, passwordHash, role, createdAt }
 */

let users = [];
let nextId = 1;

const UserStore = {
  /** Return all users (never expose passwordHash externally) */
  all() {
    return users;
  },

  findByEmail(email) {
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  findById(id) {
    return users.find((u) => u.id === id);
  },

  create({ name, email, passwordHash, role = 'member' }) {
    const user = {
      id: nextId++,
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    return user;
  },

  /** Return a safe public view (no passwordHash) */
  toPublic(user) {
    const { passwordHash, ...publicUser } = user;
    return publicUser;
  },
};

module.exports = UserStore;
