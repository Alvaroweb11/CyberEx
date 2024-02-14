const jwt = require('jsonwebtoken');

const revalidateJWT = (token) => {

    if (!token) {
        return false;
    }

    try {

        const { exp } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        const now = Math.floor(Date.now() / 1000);

        if (exp > now) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }

}

module.exports = {
    revalidateJWT
}