// repository/UserRepository.js
const db = require('../../bootstrap/Db');
const User = require('../models/User');

const UserRepository = {

    // méthodes postgres : findAll, findById, create, update, delete

    findAll: async () => {
        const { rows } = await db.query('SELECT * FROM users');
        return rows.map(row => new User(row));
    },

    findById: async id => {
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        if (rows[0]) {
            return new User(rows[0]);
        }
        throw new Error(`User ${id} not found`);
    },

    create: async data => {
        const { rows } = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [data.name, data.email, data.password]);
        if (rows[0]) {
            return new User(rows[0]);
        }
    },

    update: async (id, data) => {
        const { rows } = await db.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [data.name, data.email, data.password, id]);
        if (rows[0]) {
            return new User(rows[0]);
        }
        throw new Error(`User ${id} not found`);
    },

    delete: async id => {
        const { rows } = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (rows[0]) {
            return new User(rows[0]);
        }
        throw new Error(`User ${id} not found`);
    }

};

module.exports = UserRepository;
