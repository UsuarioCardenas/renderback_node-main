import jswt from "jsonwebtoken";
import db from "../models/index.js";
import authConfig from "../config/auth.config.js";

const {user: User, role:Role} = db;

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }
    try{
        const decoded = jswt.verify(token.replace("Bearer ", ""), authConfig.secret);
        req.userId = decoded.id;
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found!",
            });
        }
        next();
    } catch (error) {
        return res.status(401).send({
            message: "Unauthorized!",
        });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const user = await  User.findByPk(req.userId);

        const roles = await user.getRoles();
        
        const adminRole = roles.find(role => role.name === "admin");
        if (adminRole) {
            next();
            return;
        }

        return res.status(403).send({
            message: "Require Admin Role!",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving user roles",
            error: error.message,
        });
    }
};

export const isModerator = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();
        const modRoles = roles.find(role => role.name === "moderator");
        if (modRoles) {
            next();
            return;
        }
        res.status(403).send({
            message: "Require Moderator Role!",
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Error retrieving user roles",
            error: error.message,
        });
    }
}

export const isModeratorOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();
        const hasRole = roles.some((role) => ["admin", "moderator"].includes(role.name));
        if (hasRole) {
            next();
            return;
        }
        res.status(403).send({
            message: "Require Moderator or Admin Role!",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving user roles",
            error: error.message,
        });
    }
}

