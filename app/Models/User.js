// models/User.js
class User {
    constructor(id, name, email, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Méthodes et logique du modèle utilisateur peuvent être ajoutées ici
}

module.exports = User;
