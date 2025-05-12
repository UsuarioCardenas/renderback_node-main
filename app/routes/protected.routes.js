import { Router } from "express";
import {
    verifyToken,
    isAdmin
} from '../middleware/authJwt.js';

const router = Router();

// Ruta accesible por todos
router.get("/home", (req, res) => {
  res.status(200).send({ message: "Bienvenido a la página de inicio pública" });
});

// Ruta protegida: solo USER y ADMIN
router.get("/ordencompra", verifyToken, async (req, res, next) => {
  try {
    const user = await req.app.get("models").user.findByPk(req.userId);
    const roles = await user.getRoles();
    const allowed = roles.some(r => ["user", "admin"].includes(r.name));

    if (!allowed) return res.status(403).send({ message: "Require USER or ADMIN role" });

    res.status(200).send({ message: "Acceso a orden de compra concedido" });
  } catch (err) {
    next(err);
  }
});

// Ruta protegida: solo ADMIN
router.get("/laboratorio", [verifyToken, isAdmin], (req, res) => {
  res.status(200).send({ message: "Acceso a laboratorio concedido solo para admins" });
});

export default router;
