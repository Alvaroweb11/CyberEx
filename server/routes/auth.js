const { Router } = require('express');
const { registerUser, loginUser, revalidateToken, updateUser, updatePassword, updatePoints, addPoints, updateTraceability, getPoints, getRanking } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/renew', validateJWT, revalidateToken);
router.post('/updateUser', updateUser);
router.post('/updatePoints', updatePoints);
router.post('/addPoints', addPoints);
router.post('/updateTraceability', updateTraceability);
router.post('/getPoints', getPoints);
router.get('/getRanking', getRanking);
router.post('/updatePassword', updatePassword);

module.exports = router;