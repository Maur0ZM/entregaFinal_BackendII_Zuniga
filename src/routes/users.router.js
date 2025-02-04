import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import * as controllers from "../controllers/users.controllers.js"

const router = Router();

router.get('/usersRender', authenticateUser,controllers.renderUsers);

router.get("/current", authenticateUser, controllers.renderUsers);

router.get("/register", (req, res) => {
    res.render("register", { title: "Registro" });  
  });
  
router.post("/register", controllers.register);  
  
router.get("/login", (req, res) => {
    res.render("login", { title: "Iniciar sesion" });  
  });
  
router.post("/login", controllers.login);  


export default router;
