import { createPool } from "mysql2/promise";
import {DB_PORT,DB_USER,DB_HOST,DB_PASSWORD,DB_DATABASE}  from './config.js'

// conexion del archivo env
export const pool = createPool({
    port : DB_PORT,
    user : DB_USER,
    host : DB_HOST,
    password : DB_PASSWORD,
    database : DB_DATABASE
}) 