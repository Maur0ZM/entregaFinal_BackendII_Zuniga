import { productModel } from "./models/product.models.js";

class ProductDao {
  constructor(model) {
    this.model = model;
  }
  async getAllProducts() {
    try {
      return await this.model.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProduct(obj) {
    try {
      return await this.model.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      return await this.model.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteProductsById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const productsDao = new ProductDao(productModel);
