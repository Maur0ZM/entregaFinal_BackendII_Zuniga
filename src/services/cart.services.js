import { cartDao } from "../daos/mongodb/cart.dao.js";
import { CustomError } from "../utils/error.custom.js";
import * as prodService from "./products.services.js";

export const getAllCarts = async (page, limit, first_name, sort) => {
  try {
    return cartDao.getAllCarts(page, limit, first_name, sort);
  } catch (error) {
    throw new Error(error);
  }
};

export const createCart = async (obj, userId) => {
  try {
    const cart = await cartDao.createCart(obj, userId);
    if (!cart) throw new CustomError("Error al crear el carrito", 400);
    return cart;
  } catch (error) {
    throw error;
  }
};

export const updateCart = async (id, obj) => {
  try {
    const cart = await cartDao.updateCart(id, obj);
    if (!cart) throw new CustomError("Error al actualizar el carrito", 400);
    return cart;
  } catch (error) {
    throw error;
  }
};

export const deleteCart = async (id) => {
  try {
    const product = await cartDao.deleteCartById(id);
    if (!product) throw new CustomError("Error al eliminar producto", 400);
    return {
      id: product._id,
      title: product.title,
    };
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const product = await cartDao.getById(id);
    if (!product) throw new CustomError("Producto no encontrado", 404);
    return product;
  } catch (error) {
    throw error;
  }
};

export const addProductToCart = async (cartId, productId) => {
  try {
    let cart = await cartDao.getById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const product = await prodService.getById(productId);
    if (!product) throw new Error("Producto no encontrado");

    const productIndex = cart.products.findIndex((p) =>
      p.productId.equals(productId)
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }

    cart.total = cart.products.reduce(
      (acc, p) => acc + p.quantity * product.price,
      0
    );

    const updatedCart = await cartDao.updateCart(cartId, cart);

    return updatedCart;
  } catch (error) {
    throw error;
  }
};

export const removeProductFromCart = async (cartId, productId) => {
  try {
    let cart = await cartDao.getById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const product = await prodService.getById(productId);
    if (!product) throw new Error("Producto no encontrado");

    const productIndex = cart.products.findIndex((p) =>
      p.productId.equals(productId)
    );

    if (productIndex !== -1) {
      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1; 
      } else {
        cart.products.splice(productIndex, 1);
      }
    } else {
      throw new Error("Producto no encontrado en el carrito");
    }

    cart.total = cart.products.reduce(
      (acc, p) => acc - product.price,
      cart.total  
    );
    
    console.log(cart.total);

    if (cart.products.length === 0) {
      cart.total = 0;
    }

    const updatedCart = await cartDao.updateCart(cartId, cart);

    return updatedCart;
  } catch (error) {
    throw error;
  }
};

export const updateProductFromCart = async (cartId, newProducts) => {
  try {
    const cartUpd = await cartDao.updateProductFromCart(cartId, newProducts);
    if (!cartUpd) throw new CustomError("Error al actualizar productos", 404);
    return cartUpd;
  } catch (error) {
    throw error;
  }
};

export const updateProductFromCartC = async (
  cartId,
  pruductId,
  newProducts
) => {
  try {
    const cartUpd = await cartDao.updateProductFromCartC(
      cartId,
      pruductId,
      newProducts
    );
    if (!cartUpd) throw new CustomError("Error al actualizar productos", 404);
    return cartUpd;
  } catch (error) {
    throw error;
  }
};

export const removeAllProductsFromCart = async (cartId) => {
  try {
    const cartUpd = await cartDao.removeAllProductsFromCart(cartId);
    if (!cartUpd) throw new CustomError("Error al eliminar productos", 404);
    return cartUpd;
  } catch (error) {
    throw error;
  }
};
