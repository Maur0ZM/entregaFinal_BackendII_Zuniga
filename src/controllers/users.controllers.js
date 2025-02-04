import * as services from "../services/users.services.js";
import { isValidPassword } from "../utils/password.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const response = await services.getAllUsers();
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const response = await services.createUser(req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await services.updateUser(id, req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await services.deleteUserById(id);
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

export const renderUsers = async (req, res, next) => {
  try {
    const users = await services.getAllUsers();
    res.render("users", {
      title: "Users",
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await services.getAllUsers();

    const userExists = response.some((user) => user.email === email);
    if (userExists) {
      return res.status(406).json({ error: "El email ya está en uso" });
    } else {
      const newUser = await services.createUser(req.body);
      console.log(newUser, "Registrado correctamente");
      res.redirect("/users/usersRender");
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const userFind = await services.findUserByEmail(email);
  try {
    if (!userFind) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const validPassword = isValidPassword(userFind, password);
    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    const payload = {
      id: userFind.id,
      email: userFind.email,
      role: userFind.role,
    };
    const token = jwt.sign(payload, config.secret, { expiresIn: "24h" });

    res.cookie("token", token, {
      httpOnly: true, // Evita acceso desde JavaScript en el navegador
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
      maxAge: 24 * 60 * 60 * 1000, // Expira en 24 horas
      sameSite: "strict", // Protege contra ataques CSRF
    });

    res.json({ message: "Login exitoso"});
  } catch (error) {
    next(error);
  }
};
