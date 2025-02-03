import dotenv from 'dotenv';
import { connect } from "mongoose";

dotenv.config();

export default {
    port: process.env.PORT || 8080,
    secret: process.env.JWT_SECRET 
}

export const initMongoDB = async () => {
    try {
        await connect(process.env.URLMONGO);
    } catch (error) {
        throw new Error("Error al conectar con la base de datos");
    }
}