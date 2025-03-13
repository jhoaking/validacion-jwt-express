import { SECRET_JWT_KEY } from "../config.js";
import {validarServicio} from '../schema/validacion.js'
import jwt from 'jsonwebtoken';

export class validacionController {
    constructor ({validacionModel}) {
        this.validacionModel = validacionModel
    }

    login = async (req,res) =>{
        try {
            const vali = validarServicio(req.body)

            if(!vali.success) {return res.status(500).json({error: vali.error.message})}

            const result = await this.validacionModel.loginUser(vali.data);

            if(!result){ throw new Error('no se encontro el user')}

            const token = jwt.sign(
                {id: result.id , nombre: result.nombre},
                SECRET_JWT_KEY,
                {expiresIn:"48h"}
            )

            res
            .cookie('access_token',token, {
                httpOnly: true, 
                sameSite : 'strict', 
                secure : process.env.NODE_ENV == 'production',
                maxAge: 1000 * 60 * 60 * 60 * 60
            })
            res.send({result,token})
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    register = async(req,res) =>{
        console.log('datos que entrar',req.body);
        
        try {
            const vali = validarServicio(req.body);
            if(!vali.success) {return res.status(400).json({message : 'error al validardatos'})}

            const user = await this.validacionModel.registerUser(vali.data);
            res.status(201).send({user});
            
        } catch (error) {
            console.error("Error en el registro:", error); 
            res.status(500).send({ message: error.message});
        }
    }

    protected = async (req,res) =>{
        
            try {
                const token = req.cookies.access_token; 
                if (!token) {
                    return res.status(401).json({ message: 'Acceso denegado' });
                }
        
                const decoded = jwt.verify(token, SECRET_JWT_KEY); 
                const result = await this.validacionModel.protectedUser();
        
                res.status(200).json({ user: decoded, data: result });
            } catch (error) {
                res.status(403).json({ message: 'Token inválido o expirado' });
            }
        
    }

    logout = async (req,res) =>{
        res
        .clearCookie('access_token')
        .send('sesion cerrada')
    }
}