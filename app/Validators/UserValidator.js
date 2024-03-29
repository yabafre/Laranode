// validators/UserValidator.js

const UserValidator = {
    validated: (user) => {
        const errors = [];
        const name = Array.isArray(user.name) ? user.name[0] : user.name;
        const email = Array.isArray(user.email) ? user.email[0] : user.email;
        const password = Array.isArray(user.password) ? user.password[0] : user.password;

        if (!name) {
            errors.push('Le nom est obligatoire');
        }
        if (!email) {
            errors.push('L\'email est obligatoire');
        }
        if (password) {
            if (password.length < 8) {
                errors.push('Le mot de passe doit contenir au moins 8 caractères');
            }
            if (!/[A-Z]/.test(password)) {
                errors.push('Le mot de passe doit contenir au moins une majuscule');
            }
            if (!/[0-9]/.test(password)) {
                errors.push('Le mot de passe doit contenir au moins un chiffre');
            }
            if (!/[^A-Za-z0-9]/.test(password)) {
                errors.push('Le mot de passe doit contenir au moins un caractère spécial');
            }
        }
        return errors;
    },
    updated: (user) => {
        const errors = [];
        const name = Array.isArray(user.name) ? user.name[0] : user.name;
        const email = Array.isArray(user.email) ? user.email[0] : user.email;
        const password = Array.isArray(user.password) ? user.password[0] : user.password;

        if (name && name.length < 3) {
            errors.push('Le nom doit contenir au moins 3 caractères');
        }
        if (email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,6}$/.test(email)) {
            errors.push('L\'email n\'est pas valide');
        }
        if (password) {
            if (password.length < 8) {
                errors.push('Le mot de passe doit contenir au moins 8 caractères');
            }
            if (!/[A-Z]/.test(password)) {
                errors.push('Le mot de passe doit contenir au moins une majuscule');
            }
            if (!/[0-9]/.test(password)) {
                errors.push('Le mot de passe doit contenir au moins un chiffre');
            }
            if (!/[^A-Za-z0-9]/.test(password)) {
                errors.push('Le mot de passe doit contenir au moins un caractère spécial');
            }
        }
        return errors;
    }
};

module.exports = UserValidator;

