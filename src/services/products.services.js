import { productsDao } from "../daos/mongodb/product.dao.js";
import { CustomError } from "../utils/error.custom.js";
import { ProductDTO } from "../dto/products.dto.js";

export const getAllProducts = async () => {
  try {
    const products = await productsDao.getAllProducts();
    return products.map(product => new ProductDTO(product));
  } catch (error) {
    throw new Error(error);
  }
};

export const createProduct = async (obj) => {
  try {
    const product = await productsDao.createProduct(obj);
    if (!product) throw new CustomError("Error al crear producto", 400);
    return new ProductDTO(product);
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, obj) => {
  try {
    const product = await productsDao.updateProduct(id, obj);
    if (!product) throw new CustomError("Error al actualizar producto", 400);
    return new ProductDTO(product);
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const product = await productsDao.deleteProductsById(id);
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
    const product = await productsDao.getById(id);
    if (!product) throw new CustomError("Producto no encontrado", 404);
    return new ProductDTO(product);
  } catch (error) {
    throw error;
  }
};
