import express from 'express';
import {PORT} from './config.js'
import cookieParser from "cookie-parser";
import { crearValidacion } from './routes/validacion.routes.js';
import {validacionModel} from './model/validacion.model.js';

const app = express();

app.use(express.json())
app.disable('x-powered-by');
app.use(cookieParser());

// app.use((req,res,next) =>{
//     const token = req.cookies.access_token;
//         try {
//             const data = jwt.verify(token,SECRET_JWT_KEY);
//             req.user = data; 
//         } catch (error) {
//             return res.status(401).send({ message: "Token expirado o inválido" });
//         }
    
//     next()
// } )  



app.use('/',crearValidacion ({validacionModel}))

app.listen(PORT, () =>{
    console.log('server listening on',PORT);
    
})