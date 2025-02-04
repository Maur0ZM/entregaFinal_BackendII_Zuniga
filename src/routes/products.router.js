import { Router } from "express";
import * as controllers from '../controllers/products.controllers.js';
import { authenticateUser, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/view/products', controllers.renderProducts);

router.get('/create', [authenticateUser, isAdmin],(req, res) => {  
    res.render('createProducts', { title: 'Crear producto' });
});

router.get('/', controllers.getAllProducts);

router.get('/:id', controllers.getById);

router.put('/:id', controllers.updateProduct);

router.delete('/:id', controllers.deleteProduct);

router.post('/create', [authenticateUser, isAdmin], controllers.createProduct);

export default router;
