const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10747708', // Substitua pelo seu usuário MySQL
    password: '8mZSlb1dyX', // Substitua pela sua senha MySQL
    database: 'sql10747708'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

module.exports = connection;
