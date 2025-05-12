//Importamos Sequelize y la conexión a la base de datos

import { Sequelize } from 'sequelize';

// Importamos la connfiguracion de la base de datos

import dbConfig from '../config/db.config.js';

// Importamos los modelos

import userModel from './user.model.js';
import roleModel from './role.model.js';
import laboratorioModel from './laboratorio.model.js';
import ordencompraModel from './ordencompra.model.js'; 

//Creamos una instancia de Sequelize con la configuracion de la base de datos

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });
  

// Creamos un objeto para almacenar los modelos

const db = {};

// Asignamos Sequelize a la propiedad sequelize del objeto db

db.Sequelize = Sequelize;
db.sequelize = sequelize;


// Inicializamos los modelos y los asignamos al objeto db

db.user = userModel(sequelize, Sequelize);
db.role = roleModel(sequelize, Sequelize);
db.laboratorio = laboratorioModel(sequelize, Sequelize);
db.ordencompra = ordencompraModel(sequelize, Sequelize);

// Definimos las relaciones entre los modelos

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
    as: "roles",
});

db.laboratorio.hasMany(db.ordencompra, {
    foreignKey: "laboratorioId",
    sourceKey: "id"
});

db.ordencompra.belongsTo(db.laboratorio, {
    foreignKey: "laboratorioId",
    as: "laboratorios"
  });

db.ROLES = ["user", "admin", "moderator"];

export default db;