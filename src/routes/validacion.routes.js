import { Router } from "express";
import { validacionController } from "../controller/calidacion.controller.js";

export const crearValidacion = ({validacionModel}) => {

    const userValidado = new validacionController({validacionModel})

    const router = Router();
    router.post('/login',userValidado.login);
    router.get('/perfil',userValidado.protected);
    router.post('/register',userValidado.register)
 
    return router;
 }


