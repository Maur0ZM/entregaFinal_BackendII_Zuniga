import jwt from "jsonwebtoken";
export const authenticateUser = (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.render('login', { message: 'Acceso no autorizado, tienes que estar logeado', title: 'Iniciar sesion' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido" });
    }
};

export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado, se requiere rol de administrador" });
    }
    next();
};

export const isUser = (req, res, next) => {
    if (!req.user || req.user.role !== 'user') {
        return res.status(403).json({ message: "Acceso denegado, se requiere rol de usuario" });
    }
    next();
}
