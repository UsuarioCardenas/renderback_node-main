import express from 'express';
import * as ordenController from '../controllers/ordencompra.controller.js';


const router = express.Router();

// Rutas para la orden de compra
router.post('/', ordenController.createOrdenCompra);
router.get('/', ordenController.getOrdenesCompra);
router.get('/:id', ordenController.getOrdenCompraById);
router.put('/:id', ordenController.updateOrdenCompra);
router.delete('/:id', ordenController.deleteOrdenCompra);

export default router;

