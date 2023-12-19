const UserRepository = require('../repository/UserRepository');
const UserValidator = require('../validators/UserValidator');
const bcrypt = require('bcrypt');

const UserController = {

    getAllUsers: async (req, res) => {
        try {
            const users = await UserRepository.findAll();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    getUserById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new Error('Id invalide');

            const user = await UserRepository.findById(id);
            if (!user) throw new Error('Utilisateur non trouvé');

            res.json(user);
        } catch (err) {
            console.log(err);
            const statusCode = err.message === 'Utilisateur non trouvé' ? 404 : 422;
            res.status(statusCode).json({ error: err.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const errors = UserValidator.validated(req.body);
            if (errors.length) throw { statusCode: 422, errors };

            if(req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
            }

            const user = await UserRepository.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            console.log(err);
            const statusCode = err.statusCode || 500;
            const message = err.errors ? { errors: err.errors } : { error: 'Erreur interne du serveur' };
            res.status(statusCode).json(message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new Error('Id invalide');

            const errors = UserValidator.updated(req.body);
            if (errors.length) throw { statusCode: 422, errors };

            if(req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
            }

            const user = await UserRepository.update(id, req.body);
            if (!user) throw new Error('Utilisateur non trouvé');

            res.json(user);
        } catch (err) {
            console.log(err);
            const statusCode = err.statusCode || (err.message === 'Utilisateur non trouvé' ? 404 : 422);
            const message = err.errors ? { errors: err.errors } : { error: err.message };
            res.status(statusCode).json(message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new Error('Id invalide');

            const user = await UserRepository.delete(id);
            if (!user) throw new Error('Utilisateur non trouvé');

            res.status(204).send();
        } catch (err) {
            console.log(err);
            const statusCode = err.message === 'Utilisateur non trouvé' ? 404 : 422;
            res.status(statusCode).json({ error: err.message });
        }
    },

};

module.exports = UserController;
