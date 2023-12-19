# Laranode - API

Ce projet Node.js est une application backend qui implémente un système CRUD pour la gestion des utilisateurs. Le serveur utilise un routage personnalisé sans frameworks tels qu'Express.js et gère le parsing des requêtes `multipart/form-data` ainsi que `application/json`.

## Fonctionnalités

- CRUD (Create, Read, Update, Delete) API pour les utilisateurs.
- Parsing des corps de requêtes en JSON et `multipart/form-data`.
- Validation des données entrantes pour les requêtes `POST` et `PUT`.
- Gestion des erreurs 404 (Not Found) et 405 (Method Not Allowed).
- Hachage des mots de passe avec `bcrypt`.

## Prérequis

- Node.js
- PostgreSQL

## Configuration

Pour configurer le projet, renommez le fichier `.env.example` en `.env` et modifiez les variables d'environnement selon votre configuration.

## Installation

Pour installer les dépendances du projet, exécutez :

```bash
npm install
```

## Démarrage
Pour démarrer le serveur, exécutez :

```bash
npm start
```

## Structure du Projet

```bash
[laranode]/
│
├── app/
│   ├── Controllers/
│   │   └── UserController.js
│   ├── Models/
│   │   └── User.js
│   ├── Repository/
│   │   └── UserRepository.js
│   └── Validators/
│       └── UserValidator.js
│
├── bootstrap/
│   ├── Db.js
│   └── Router.js
│
├── routes/
│   └── index.js
│
├── .env
├── .env.example
├── index.js
└── package.json
```

