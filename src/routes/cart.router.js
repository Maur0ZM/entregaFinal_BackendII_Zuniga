import { Router } from "express";
import * as controllers from '../controllers/cart.controllers.js';
import { authenticateUser, isUser } from "../middlewares/auth.middleware.js";

const router = Router();

//Rutas CRUD product

router.get('/', [authenticateUser, isUser], controllers.getAllCarts);

router.get('/:id', [authenticateUser, isUser], controllers.getById);

router.put('/:id', [authenticateUser, isUser], controllers.updateCart);

router.delete('/:id', [authenticateUser, isUser], controllers.deleteCart);

router.post('/', [authenticateUser, isUser], controllers.createCart);

router.post('/carts/:cartId/product/:productId', [authenticateUser, isUser],controllers.addProductToCart);

router.delete('/carts/:cartId/product/:productId', [authenticateUser, isUser], controllers.removeProductFromCart);

router.put('/carts/:cartId', [authenticateUser, isUser], controllers.updateProductFromCart);

router.put('/carts/:cartId/product/:productId', [authenticateUser, isUser], controllers.updateProductFromCartC);

router.delete('/carts/:cartId', [authenticateUser, isUser], controllers.removeAllProductsFromCart);
  
export default router;