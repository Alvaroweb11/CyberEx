console.clear();

import dotenv from 'dotenv';
import express from 'express';
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';
import authSessionRouter from './routes/auth_session.js'
import authTokenRouter from './routes/auth_token.js'
import mongoose from 'mongoose';

dotenv.config();

const PORT = 3000 || process.env.PORT;
const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use("/account", accountRouter);

expressApp.use("/auth", authRouter);

expressApp.use("/auth-session", authSessionRouter);
expressApp.use("/auth-token", authTokenRouter);

// expressApp.get("/cuenta/:idcuenta/:idinventado", (req, res) => {
//     console.log(req.params);
//     console.log(req.body);

//     res.send("Tu cuenta personal");
// });

const bootstrap = async () => {
    
    await mongoose.connect(process.env.MONGODB_URL);
    
    expressApp.listen(PORT, () =>
        console.log(`Servidor en el puerto: ${PORT}`)
    );
    
}

bootstrap();