import { Router } from "express";
import * as controllers from '../controllers/ticket.controllers.js';

const router = Router();

router.post('/create', controllers.createTicket);

export default router;