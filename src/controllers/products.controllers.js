import * as services from "../services/products.services.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const response = await services.getAllProducts();
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const response = await services.createProduct(req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await services.updateProduct(id, req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await services.deleteProduct(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await services.getById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const renderProducts = async (req, res, next) => {
  try {
    const products = await services.getAllProducts();
    res.render("products", {
      title: "Products", 
      products
    });
  } catch (error) {
    next(error);
  }
};
