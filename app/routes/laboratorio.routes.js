import express from 'express';
import {
    createLaboratorio,
    getLaboratorios,
    getLaboratorioById,
    updateLaboratorio,
    deleteLaboratorio,
} from '../controllers/laboratorio.controller.js';

import {
    verifyToken,
    isAdmin,
} from '../middleware/authJwt.js';

const router = express.Router();

// Rutas para el laboratorio

router.post('/', [verifyToken, isAdmin], createLaboratorio); // Crear un nuevo laboratorio
router.get('/', getLaboratorios); // Obtener todos los laboratorios
router.get('/:id', getLaboratorioById); // Obtener un laboratorio por ID
router.put('/:id', [verifyToken, isAdmin], updateLaboratorio); // Actualizar un laboratorio por ID
router.delete('/:id', [verifyToken, isAdmin], deleteLaboratorio); // Eliminar un laboratorio por ID


export default router;