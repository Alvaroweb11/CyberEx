import { Router } from "express";
import { USERS_BBDD } from '../bbdd.js';
import authByEmailPassword from "../helpers/auth-by-email-password.js";

const authRouter = Router();

//Endpoint publico
authRouter.get("/publico", (req, res) => res.send("Endpoint publico"));

//Endpoint autenticado
authRouter.post("/autenticado", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    try {

        const user = authByEmailPassword(email, password);

        return res.send(`Usuario ${user.name} autenticado`);

    } catch (err) {

        return res.sendStatus(401);

    }

})

//Endpoint autorizado
authRouter.post("/autorizado", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    try {

        const user = authByEmailPassword(email, password);

        if (user.role !== 'admin') return res.sendStatus(403);

        return res.send(`Usuario administrador ${user.name}`);

    } catch (err) {

        return res.sendStatus(401);

    }

});

export default authRouter;