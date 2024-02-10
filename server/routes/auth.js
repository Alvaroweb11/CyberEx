/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
// const { check } = require('express-validator');
// const { validateFields } = require('../middlewares/validateFields');
const express = require('express');
const { Router } = require('express');
const { registerUser, loginUser, revalidateToken } = require('../controllers/auth');
// const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

// router.post(
//     '/register', 
//     [ // middlewares
//         check('name', 'El nombre es obligatorio').not().isEmpty(),
//         check('email', 'El email es obligatorio').isEmail(),
//         check('password', 'El password debe de ser de 8 caracteres').isLength({ min: 8 }),
//         validateFields
//     ],
//     registerUser
// );

// router.get(
//     '/login',
//     [
//         check('email', 'El email es obligatorio').isEmail(),
//         check('password', 'El password debe de ser de 8 caracteres').isLength({ min: 8 }),
//         validateFields
//     ],
//     loginUser 
// );

// router.get('/renew', validateJWT, revalidateToken);

router.post('/register', registerUser);
router.get('/login', loginUser);
router.get('/revalidate', revalidateToken);

module.exports = router;