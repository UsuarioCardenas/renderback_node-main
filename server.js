import express from 'express';
import cors from 'cors';
import db from './app/models/index.js';
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import laboratorioRoutes from './app/routes/laboratorio.routes.js';
import ordenRoutes from './app/routes/ordencompra.routes.js';
import protectedRoutes from './app/routes/protected.routes.js';
import bcrypt from 'bcryptjs'; // Importar bcrypt para encriptar la contraseña

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://renderfront-react-main.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/laboratorios', laboratorioRoutes);
app.use('/api/ordenes', ordenRoutes);
app.use('/api/protected', protectedRoutes);

const PORT = process.env.PORT || 3000;

// Función para insertar los roles "user" y "admin"
const createRoles = async () => {
  try {
    // Verificar si ya existen los roles
    const userRole = await db.role.findOne({ where: { name: 'user' } });
    const adminRole = await db.role.findOne({ where: { name: 'admin' } });

    if (!userRole) {
      // Crear rol "user"
      await db.role.create({
        name: 'user',
      });
      console.log('Rol "user" creado');
    }

    if (!adminRole) {
      // Crear rol "admin"
      await db.role.create({
        name: 'admin',
      });
      console.log('Rol "admin" creado');
    }
  } catch (error) {
    console.error('Error al crear roles:', error);
  }
};

// Función para crear un usuario admin automáticamente
const createAdminUser = async () => {
  try {
    // Verificar si ya existe un usuario admin
    const existingAdmin = await db.user.findOne({ where: { username: 'admin' } });

    if (!existingAdmin) {
      // Crear un usuario administrador por defecto
      const hashedPassword = await bcrypt.hash('admin123', 10); // Cambia la contraseña por una más segura

      const adminUser = await db.user.create({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
      });

      // Asignar rol de administrador al usuario
      const adminRole = await db.role.findOne({ where: { name: 'admin' } });
      if (adminRole) {
        await adminUser.addRole(adminRole);
      }

      console.log('Usuario admin creado');
    } else {
      console.log('El usuario admin ya existe');
    }
  } catch (error) {
    console.error('Error al crear el usuario admin:', error);
  }
};

// Sincronización de la base de datos y creación de roles y usuario admin
db.sequelize.sync({ force: false }).then(() => {
    console.log("Base de datos sincronizada.");
    createRoles(); // Llamar a la función para crear los roles
    createAdminUser(); // Llamar a la función para crear el admin
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});
