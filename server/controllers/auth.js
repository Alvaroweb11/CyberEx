const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');
require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

const registerUser = async(req, res = response ) => {

    const { user, email, password } = req.body;

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME});
        const query = util.promisify(connection.query).bind(connection);

        const rows = await query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if ( rows.length > 0 ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync( password, salt );

        const result = await query('INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)', [user, email, passwordHash]);

        // Generar JWT
        const token = await generateJWT( result.insertId, email );
    
        res.status(201).json({
            ok: true,
            uid: result.insertId,
            name: email,
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

const loginUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME});
        const query = util.promisify(connection.query).bind(connection);

        const rows = await query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if ( rows.length === 0 ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email',
            });
        }

        const usuario = rows[0];

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );
        console.log('Contraseña válida:', validPassword);
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generateJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
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

const revalidateToken = async (req, res = response ) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT( uid, name );

    // Obtener información del usuario, y remover el password
    const user = await Usuario.findById( uid );
    
    res.json({
        ok: true,
        token,
        uid,
        name: user.name,
    })
}

module.exports = {
    registerUser,
    loginUser,
    revalidateToken
}