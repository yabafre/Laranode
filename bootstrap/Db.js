// bootstrap/Db.js

// client pg

const { Client } = require('pg');

// config db_host, db_user, db_password, db_port, db_name

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME
});

// connect db

client.connect();

// export client

module.exports = client;

