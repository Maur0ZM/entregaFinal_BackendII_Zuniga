import jwt from "jsonwebtoken";
export const authenticateUser = (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Acceso no autorizado, token faltante" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardamos la info del usuario en req.user
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido" });
    }
};
