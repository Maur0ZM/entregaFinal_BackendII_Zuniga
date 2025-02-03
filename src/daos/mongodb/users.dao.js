import { usersModel } from "./models/users.models.js";

class UsersDao {
  constructor(model) {
    this.model = model;
  }
  async getAllUsers() {
    try {
      return await this.model.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(obj) {
    try {
      const newUser = await this.model.create(obj);
      await newUser.save();
      return newUser;
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

  async updateUser(id, obj) {
    try {
      return await this.model.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteUserById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findUserByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export const usersDao = new UsersDao(usersModel);
