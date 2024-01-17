import { Router } from "express";
import authByEmailPassword from "../helpers/auth-by-email-password.js";

const authSessionRouter = Router();

authSessionRouter.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    try {

        const user = authByEmailPassword(email, password);

        return res.send(`Usuario ${user.name} autenticado`);

    } catch (err) {

        return res.sendStatus(401);

    }
});

export default authSessionRouter;