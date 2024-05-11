const { Router } = require('express');
const { registerUser, loginUser, revalidateToken, updatePoints, updateTraceability, getPoints, getRanking } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/renew', validateJWT, revalidateToken);
router.post('/updatePoints', updatePoints);
router.post('/updateTraceability', updateTraceability);
router.post('/getPoints', getPoints);
router.get('/getRanking', getRanking);

module.exports = router;