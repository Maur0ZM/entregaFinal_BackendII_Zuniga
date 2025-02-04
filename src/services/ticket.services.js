import { ticketDao } from "../daos/mongodb/ticket.dao.js";
import { CustomError } from "../utils/error.custom.js";

export const createTicket = async (obj) => {
    try {
        const ticket = await ticketDao.createTicket(obj);
        if (!ticket) throw new CustomError("Error al crear ticket", 400);
        return ticket;
    } catch (error) {
        throw error;
    }
};