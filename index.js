// index.js
const dotenv = require('dotenv');
dotenv.config();
const { server } = require('./bootstrap/Router');
// Configurer la base de données
const client = require('./bootstrap/Db');

//log db connect
client.on('connect', () => {
    console.log('Database connected');
});

// Configurer les routes
require('./routes');

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
