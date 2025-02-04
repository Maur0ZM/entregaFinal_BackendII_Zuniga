import * as services from '../services/ticket.services.js';

export const createTicket = async (req, res, next) => {
    try {
        const response = await services.createTicket(req.body);
        res.json(response);
    } catch (error) {
        next(error);
    }
}