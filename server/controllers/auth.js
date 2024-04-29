const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');
require('dotenv').config();
const mysql = require('mysql');
const util = require('util');
const { get } = require('http');

const registerUser = async (req, res = response) => {

    const { username, email, password } = req.body;

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const query = util.promisify(connection.query).bind(connection);

        const rows = await query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        const rows1 = await query('SELECT * FROM usuarios WHERE username = ?', [username]);

        if (rows1.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, salt);

        const result = await query('INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)', [username, email, passwordHash]);
        const result1 = await query('INSERT INTO ejercicios (idUser, points, hashTask1, hashTask2, hashTask3, steganographyTask1) VALUES (?, ?, ?, ?, ?)', [result.insertId, 0, 0, 0, 0, 0]);

        // Generar JWT
        const token = await generateJWT(result.insertId, username);

        res.status(201).json({
            ok: true,
            uid: result.insertId,
            username: username,
            email: email,
            role: result.role,
            token
        })

        connection.end();

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const query = util.promisify(connection.query).bind(connection);

        const rows = await query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email',
            });
        }

        const user = rows[0];

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generateJWT(user.id, user.username);

        res.status(201).json({
            ok: true,
            uid: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token
        })

        connection.end();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const revalidateToken = async (req, res = response) => {

    const { uid } = req.body;

    try {

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const query = util.promisify(connection.query).bind(connection);

        // Obtener información del usuario, y remover el password
        const rows = await query('SELECT * FROM usuarios WHERE id = ?', [uid]);
        const user = rows[0];

        // Generar JWT
        const token = await generateJWT(user.id, user.username);

        res.json({
            ok: true,
            uid: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }

}

const updatePoints = async (req, res = response) => {

    const { uid } = req.body;

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const query = util.promisify(connection.query).bind(connection);

        const rows = await query('SELECT * FROM ejercicios WHERE idUser = ?', [uid]);

        if (rows.length === 0) {
            await query('INSERT INTO ejercicios (idUser, points, hashTask1, hashTask2, hashTask3, steganographyTask1) VALUES (?, ?, ?, ?, ?)', [uid, points, hashTask1, hashTask2, hashTask3, steganographyTask1]);
        } else {
            let updateQuery = 'UPDATE ejercicios SET ';
            let queryParams = [];

            for (let [key, value] of Object.entries(req.body)) {
                if (value !== undefined && key !== 'uid') {
                    updateQuery += `${key} = ?, `;
                    queryParams.push(value);
                }
            }

            updateQuery = updateQuery.slice(0, -2); // Remove the last comma and space
            updateQuery += ' WHERE idUser = ?';
            queryParams.push(uid);

            await query(updateQuery, queryParams);
        }

        res.status(201).json({
            ok: true,
            msg: 'Puntos actualizados'
        })

        connection.end();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getPoints = async (req, res = response) => {

    const userId = req.body.uid;

    try {

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const query = util.promisify(connection.query).bind(connection);

        const rows = await query('SELECT * FROM ejercicios WHERE idUser = ?', [userId]);

        const user = rows[0];

        res.status(201).json({
            ok: true,
            points: user.points,
            hashTask1: user.hashTask1,
            hashTask2: user.hashTask2,
            hashTask3: user.hashTask3,
            steganographyTask1: user.steganographyTask1,
        })

        connection.end();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const getRanking = async (req, res = response) => {

    try {

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const query = util.promisify(connection.query).bind(connection);

        const rows = await query('SELECT usuarios.username, ejercicios.points FROM ejercicios JOIN usuarios ON ejercicios.idUser = usuarios.id ORDER BY ejercicios.points DESC LIMIT 10');

        res.status(201).json({
            ok: true,
            ranking: rows
        })

        connection.end();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

async function getUserName(uid) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    const query = util.promisify(connection.query).bind(connection);

    const rows = await query('SELECT username FROM usuarios WHERE id = ?', [uid]);

    connection.end();

    return rows[0] ? rows[0].username : 'Desconocido';
}

module.exports = {
    registerUser,
    loginUser,
    revalidateToken,
    updatePoints,
    getPoints,
    getRanking,
    getUserName
}