// controllers/UserController.js
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
                res.status(500).json(err.toString());
            }
        },

        getUserById: async (req, res) => {
            try {
                const user = await UserRepository.findById(req.params.id);
                if (!user) {
                    return res.status(404).json({ errors: ['Utilisateur non trouvé'] });
                }
                res.json(user);
            } catch (err) {
                console.log(err);
                res.status(500).json(err.toString());
            }
        },

        createUser: async (req, res) => {
            try {
                console.log('req.body: ',req.body)
                const errors = UserValidator.validated(req.body);
                if (errors.length) {
                    return res.status(422).json({ errors });
                }
                if(req.body.password) {
                    req.body.password = bcrypt.hashSync(req.body.password, 10);
                }
                const user = await UserRepository.create(req.body);
                res.status(201).json(user);
            } catch (err) {
                console.log(err);
                res.status(500).json(err.toString());
            }
        },

        updateUser: async (req, res) => {
            try {
                const errors = UserValidator.updated(req.body);
                if (errors.length) {
                    return res.status(422).json({ errors });
                }
                const user = await UserRepository.update(req.params.id, req.body);
                if (!user) {
                    return res.status(404).json({ errors: ['Utilisateur non trouvé'] });
                }
                res.json(user);
            } catch (err) {
                console.log(err);
                res.status(500).json(err.toString());
            }
        },

        deleteUser: async (req, res) => {
            try {
                const user = await UserRepository.delete(req.params.id);
                if (!user) {
                    return res.status(404).json({ errors: ['Utilisateur non trouvé'] });
                }
                res.status(204);
            } catch (err) {
                console.log(err);
                res.status(500).json(err.toString());
            }
        },

};

module.exports = UserController;
