const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário MySQL
    password: 'root', // Substitua pela sua senha MySQL
    database: 'ecosystem'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

module.exports = connection;
