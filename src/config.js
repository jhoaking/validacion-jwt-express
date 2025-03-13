import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 1234
export const DB_PORT = process.env.DB_PORT || 3306
export const DB_USER = process.env.DB_USER || "root"
export const DB_PASSWORD = process.env.DB_PASSWORD || "mysqlcasa"
export const DB_DATABASE = process.env.DB_DATABASE || "companydb"
export const DB_HOST = process.env.DB_HOST || "localhost"
export const SALT_ROUNDS = process.env.SALT_ROUNDS ||10
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || "mi-password-toda-poderosa"
