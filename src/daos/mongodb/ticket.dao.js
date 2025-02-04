import { ticketModel } from "./models/ticket.models.js";

class TicketDao {
    constructor(model){
        this.model = model;
    }

    async createTicket (obj){
        try {
            const newTicket = await this.model.create(obj);
            await newTicket.save();
            return newTicket;
        } catch (error) {
            throw new Error(error);
        }
    }
}


export const ticketDao = new TicketDao(ticketModel);