const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');
require('dotenv').config();
const mysql = require('mysql');
const util = require('util');
const { exec } = require('child_process');

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
        await query('INSERT INTO ejercicios (idUser, points, hashEasyTask1, hashEasyTask2, hashEasyTask3, hashHardTask1, hashHardTask2, steganographyEasyTask1, steganographyhardTask1, phishingEasyTask1, phishingHardTask1) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [result.insertId, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        await query('INSERT INTO trazabilidad (idUser, hashEasyTask1, hashEasyTask2, hashEasyTask3, hashHardTask1, hashHardTask2, steganographyEasyTask1, steganographyhardTask1, phishingEasyTask1, phishingHardTask1) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [result.insertId, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

        // Generar JWT
        const token = await generateJWT(result.insertId, username);

        res.status(201).json({
            ok: true,
            uid: result.insertId,
            username: username,
            email: email,
            fullName: result.fullName,
            role: result.role,
            token
        })

        connection.end();

    } catch (error) {
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
            fullName: user.fullName,
            role: user.role,
            token
        })

        connection.end();

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const deleteUser = async (req, res = response) => {

    const { uid } = req.body;

    try {

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const query = util.promisify(connection.query).bind(connection);

        await query('DELETE FROM usuarios WHERE id = ?', [uid]);
        await query('DELETE FROM ejercicios WHERE idUser = ?', [uid]);
        await query('DELETE FROM trazabilidad WHERE idUser = ?', [uid]);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })

        connection.end();

    } catch (error) {
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
            fullName: user.fullName,
            role: user.role,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const updateUser = async (req, res = response) => {
    
    const { uid, username, email, fullName } = req.body;

    try {

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const query = util.promisify(connection.query).bind(connection);

        // Verificar si el nombre de usuario ya existe
        const [existingUsername] = await query('SELECT * FROM usuarios WHERE username = ? AND id != ?', [username, uid]);
        if (existingUsername) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de usuario ya está en uso'
            });
        }

        // Verificar si el correo electrónico ya existe
        const [existingEmail] = await query('SELECT * FROM usuarios WHERE email = ? AND id != ?', [email, uid]);
        if (existingEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo electrónico ya está en uso'
            });
        }

        // Actualizar información del usuario
        await query('UPDATE usuarios SET username = ?, email = ?, fullName = ? WHERE id = ?', [username, email, fullName, uid]);

        // Obtener información actualizada del usuario
        const [user] = await query('SELECT * FROM usuarios WHERE id = ?', [uid]);

        res.json({
            ok: true,
            username: user.username,
            email: user.email,
            fullName: user.fullName
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const updatePassword = async (req, res = response) => {

    const { uid, oldPassword, newPassword } = req.body;

    try {

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const query = util.promisify(connection.query).bind(connection);

        const [user] = await query('SELECT * FROM usuarios WHERE id = ?', [uid]);

        // Validar contraseña actual
        const validPassword = bcrypt.compareSync(oldPassword, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Encriptar nueva contraseña
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(newPassword, salt);

        // Actualizar contraseña
        await query('UPDATE usuarios SET password = ? WHERE id = ?', [passwordHash, uid]);

        res.json({
            ok: true,
            msg: 'Contraseña actualizada'
        })

    } catch (error) {
        console.error(error);
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

        res.status(201).json({
            ok: true,
            points: req.body.points,
            hashEasyTask1: req.body.hashEasyTask1,
            hashEasyTask2: req.body.hashEasyTask2,
            hashEasyTask3: req.body.hashEasyTask3,
            hashHardTask1: req.body.hashHardTask1,
            hashHardTask2: req.body.hashHardTask2,
            steganographyEasyTask1: req.body.steganographyEasyTask1,
            steganographyHardTask1: req.body.steganographyHardTask1,
            phishingEasyTask1: req.body.phishingEasyTask1,
            phishingHardTask1: req.body.phishingHardTask1,
            msg: 'Puntos actualizados'
        })

        connection.end();

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const addPoints  = async (req, res = response) => {
    
        const { username, points } = req.body;

        const userId = await getUserId(username);
    
        try {
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });
            const query = util.promisify(connection.query).bind(connection);
    
            const rows = await query('SELECT points FROM ejercicios WHERE idUser = ?', [userId]);
    
            const userPoints = rows[0].points;
    
            await query('UPDATE ejercicios SET points = ? WHERE idUser = ?', [userPoints + points, userId]);
    
            res.status(201).json({
                ok: true,
                points: userPoints + points,
                msg: 'Puntos actualizados'
            })
    
            connection.end();
    
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            });
        }
    }

const updateTraceability = async (req, res = response) => {

    const { uid } = req.body;

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const query = util.promisify(connection.query).bind(connection);

        let updateQuery = 'UPDATE trazabilidad SET ';
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

        res.status(201).json({
            ok: true,
            msg: 'Trazabilidad actualizada'
        })

        connection.end();

    } catch (error) {
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
            hashEasyTask1: user.hashEasyTask1,
            hashEasyTask2: user.hashEasyTask2,
            hashEasyTask3: user.hashEasyTask3,
            hashHardTask1: user.hashHardTask1,
            hashHardTask2: user.hashHardTask2,
            steganographyEasyTask1: user.steganographyEasyTask1,
            steganographyHardTask1: user.steganographyHardTask1,
            phishingEasyTask1: user.phishingEasyTask1,
            phishingHardTask1: user.phishingHardTask1
        })

        connection.end();

    } catch (error) {
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

async function getStartMachine(req, res) {
    try {
        const command = 'podman run -d --rm -p 5901:5901 --name kali-gui kali-gui';

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error}`);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            res.json({ 
                ok: true,
                msg: 'Command executed successfully'
            });
        });
    } catch (err) {
        console.error(`Caught exception: ${err}`);
        res.status(500).json({ error: `Caught exception: ${err.message}` });
    }
}

async function getRemoveMachine(req, res) {
    try {
        const command = 'podman stop kali-gui';

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error}`);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            res.json({ 
                ok: true,
                msg: 'Command executed successfully'
            });
        });
    } catch (err) {
        console.error(`Caught exception: ${err}`);
        res.status(500).json({ error: `Caught exception: ${err.message}` });
    }
}

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    revalidateToken,
    updateUser,
    updatePassword,
    updatePoints,
    addPoints,
    updateTraceability,
    getPoints,
    getRanking,
    getUserName,
    getUserId,
    getStartMachine,
    getRemoveMachine
}