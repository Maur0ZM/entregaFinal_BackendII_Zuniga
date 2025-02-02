import { Router } from "express";
import * as controllers from '../controllers/products.controllers.js';

const router = Router();

router.get('/view/products', controllers.renderProducts)

router.get('/', controllers.getAllProducts);

router.get('/:id', controllers.getById);

router.put('/:id', controllers.updateProduct);

router.delete('/:id', controllers.deleteProduct);

router.post('/', controllers.createProduct);

export default router;