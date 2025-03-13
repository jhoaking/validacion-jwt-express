import { SALT_ROUNDS } from '../config.js';
import {pool} from '../db.js'
import bcrypt from 'bcrypt';

export class validacionModel {
    static protectedUser = async () =>{
        const [result] = await pool.query('SELECT BIN_TO_UUID(id),nombre,email,password FROM users');
        return result;
    }
    static loginUser = async ({email,password}) =>{
        const [result] = await pool.query('SELECT  BIN_TO_UUID(id) AS id, nombre,email, password FROM users WHERE email = ?', [email]);
        if(result.length == 0){return null}

        const user = result[0];

        const compararPassword = await bcrypt.compare(password,user.password);
        if(!compararPassword){throw new Error ('password invalido')}

        return user;
    } 
  

    static registerUser = async ({nombre, email,password}) =>{
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?' , [email]);

        if(rows.length >0 ) {throw new Error('el user ya existe')}

        const hashedPasssword = await bcrypt.hash(password, Number(SALT_ROUNDS));

         await pool.query('INSERT INTO users(nombre,email,password) VALUES(?,?,?)',[nombre,email,hashedPasssword]);

       const [newUser] = await pool.query('SELECT BIN_TO_UUID(id),nombre,email,password FROM  users  WHERE email = ?',[email])
       if(newUser.length === 0 ){throw new Error('no  se pudo registrar el user')}

       return newUser[0];
    }

}