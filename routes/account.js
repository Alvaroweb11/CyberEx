import { Router } from "express";
import userModel from "../schemas/user-schema.js";

const accountRouter = Router();

accountRouter.use((req, res, next) => {
    console.log(req.ip);

    next();
});

accountRouter.get('/:guid', async (req, res) => {
    const { guid } = req.params;
    //const user = USERS_BBDD.find(user => user.guid === guid);
    const user = await userModel.findById(guid).exec();

    if (!user) return res.status(404).send();

    return res.send(user);
});

accountRouter.post('/', async (req, res) => {
    const { guid, name } = req.body;

    if (!guid || !name) return res.status(400).send();

    //const user = USERS_BBDD.find(user => user.guid === guid);
    const user = await userModel.findById(guid).exec();

    if (user) return res.status(409).send("El usuario ya se encuentra registrado");

    //USERS_BBDD.push({
    //    guid,
    //    name,
    //});
    const newUser = new userModel({ _id: guid, name });
    await newUser.save();

    return res.send("Usuario registrado");
});

accountRouter.patch('/:guid', async (req, res) => {
    const { guid } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).send();

    //const user = USERS_BBDD.find(user => user.guid === guid);
    const user = await userModel.findById(guid).exec();

    if (!user) return res.status(404).send();

    user.name = name;

    await user.save();

    return res.send();
});

accountRouter.delete('/:guid', async (req, res) => {
    const { guid } = req.params;
    //const userIndex = USERS_BBDD.findIndex(user => user.guid === guid);
    const user = await userModel.findById(guid).exec();

    if (!user) return res.status(404).send();

    //USERS_BBDD.splice(userIndex, 1);
    await user.deleteOne();

    return res.send();
});

export default accountRouter;