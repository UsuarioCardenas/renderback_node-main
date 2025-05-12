//importamos el objeto de la base de datos
import db from '../models/index.js';

//extramos el modelo de rol
const {ROLES, user:User} = db;

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const userByUsername = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (userByUsername) {
            return res.status(400).send({
                message: "Failed! Username is already in use!",
            });
        }

        const userByEmail = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (userByEmail) {
            return res.status(400).send({
                message: "Failed! Email is already in use!",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Error checking for duplicate username or email",
            error: error.message,
        });
    }
};

export const checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for (const role of req.body.roles) {
            if (!ROLES.includes(role)) {
                return res.status(400).send({
                    message: `Failed! Role ${role} does not exist!`,
                });
            }
        }
    }
    next();
};
