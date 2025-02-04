import { usersDao } from "../daos/mongodb/users.dao.js";
import { CustomError } from "../utils/error.custom.js";
import { UserDTO } from "../dto/users.dto.js";

export const getAllUsers = async () => {
  try {
    const users = await usersDao.getAllUsers();
    return users.map(users => new UserDTO(users));
  } catch (error) {
    throw new Error(error);
  }
};

export const createUser = async (obj) => {
  try {
    const user = await usersDao.createUser(obj);
    if (!user) throw new CustomError("Error al crear el usuario", 400);
    return new UserDTO(user);
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, obj) => {
  try {
    const user = await usersDao.updateUser(id, obj);
    if (!user) throw new CustomError("Error al actualizar el usuario", 400);
    return new UserDTO(user);
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (id) => {
  try {
    const user = await usersDao.deleteUserById(id);
    if (!user) throw new CustomError("Error al eliminar el usuario", 400);
    return {
      id: user._id,
      title: user.title,
    };
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const user = await usersDao.getById(id);
    if (!user) throw new CustomError("Usuario no encontrado", 404);
    return new UserDTO(user);
  } catch (error) {
    throw error;
  }
  
};

export const findUserByEmail = async (email) => {
    try {
      const user = await usersDao.findUserByEmail(email);
      if (!user) throw new CustomError("Usuario no encontrado", 404);
      return new UserDTO(user);
    } catch (error) {
      throw error;
    }
};
