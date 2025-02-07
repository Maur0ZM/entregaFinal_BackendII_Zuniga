export const addProductToCart = async (cartId, productId) => {
  try {
    const product = await prodService.getById(productId);
    const cart = await cartDao.getById(cartId);
    console.log(cart);
    // console.log(product);
    const cartUpd = await cartDao.addProductToCart(cartId, productId);
    if (!cartUpd) throw new CustomError("Error al añadir el producto", 404);
    return cartUpd;
  } catch (error) {
    throw error;
  }
};