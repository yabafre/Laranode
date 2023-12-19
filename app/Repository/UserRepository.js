// repository/UserRepository.js
const db = require('../../bootstrap/Db');
const User = require('../models/User');

const UserRepository = {

    // méthodes postgres : findAll, findById, create, update, delete

    findAll: async () => {
        try {
            const { rows } = await db.query('SELECT * FROM users');
            return rows.map(row => new User(row));
        } catch (err) {
            console.error('Error in findAll:', err);
            return false;
        }
    },

    findById: async id => {
        try {
            const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
            return rows[0] ? new User(rows[0]) : false;
        } catch (err) {
            console.error(`Error in findById for id ${id}:`, err);
            return false;
        }
    },

    create: async data => {
        try {
            const { rows } = await db.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [data.name, data.email, data.password]
            );
            return rows[0] ? new User(rows[0]) : false;
        } catch (err) {
            console.error('Error in create:', err);
            return false;
        }
    },

    update: async (id, data) => {
        try {
            const updates = [];
            const values = [];

            if (data.name) {
                updates.push('name = $' + (updates.length + 1));
                values.push(data.name);
            }
            if (data.email) {
                updates.push('email = $' + (updates.length + 1));
                values.push(data.email);
            }
            if (data.password) {
                updates.push('password = $' + (updates.length + 1));
                values.push(data.password);
            }

            if (updates.length === 0) {
                throw new Error('Aucune donnée fournie pour la mise à jour');
            }

            const queryString = 'UPDATE users SET ' + updates.join(', ') + ' WHERE id = $' + (updates.length + 1) + ' RETURNING *';
            values.push(id);

            const { rows } = await db.query(queryString, values);
            return rows[0] ? new User(rows[0]) : false;
        } catch (err) {
            console.error(`Error in update for id ${id}:`, err);
            return false;
        }
    },

    delete: async id => {
        try {
            const { rows } = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            return rows[0] ? new User(rows[0]) : false;
        } catch (err) {
            console.error(`Error in delete for id ${id}:`, err);
            return false;
        }
    }

};

module.exports = UserRepository;
