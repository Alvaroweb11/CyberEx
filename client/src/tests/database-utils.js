const mysql = require('mysql');
const util = require('util');

async function getUserId(username) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    const query = util.promisify(connection.query).bind(connection);

    const rows = await query('SELECT id FROM usuarios WHERE username = ?', [username]);

    connection.end();

    return rows[0] ? rows[0].id : -1;
}

module.exports = { getUserId };