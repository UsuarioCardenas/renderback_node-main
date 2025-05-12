import db from '../models/index.js';

const { ordencompra: OrdenCompra } = db;

export const createOrdenCompra = async (req, res) => {
    try {
        const { fecha, total, situacion, laboratorioId } = req.body;
        const orden = await OrdenCompra.create({ fecha, total, situacion, laboratorioId });
        res.status(201).json(orden);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la orden de compra", error: error.message });
    }
};

export const getOrdenesCompra = async (_req, res) => {
    try {
      const ordenes = await OrdenCompra.findAll({
        include: {
          model: db.laboratorio,
          as: "laboratorios",
          attributes: ["id", "nombre"],
        },
      });
      res.status(200).json(ordenes);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las órdenes", error: error.message });
    }
  };

  export const getOrdenCompraById = async (req, res) => {
    try {
      const orden = await OrdenCompra.findByPk(req.params.id, {
        include: {
          model: db.laboratorio,
          as: "laboratorios",
          attributes: ["id", "nombre"],
        },
      });
      if (!orden) return res.status(404).json({ message: "Orden de compra no encontrada" });
      res.status(200).json(orden);
    } catch (error) {
      res.status(500).json({ message: "Error al buscar la orden", error: error.message });
    }
  };
  

export const updateOrdenCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await OrdenCompra.update(req.body, { where: { id } });
        if (updated === 0) return res.status(404).json({ message: "Orden no encontrada" });
        res.status(200).json({ message: "Orden actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la orden", error: error.message });
    }
};

export const deleteOrdenCompra = async (req, res) => {
    try {
        const deleted = await OrdenCompra.destroy({ where: { id: req.params.id } });
        if (deleted === 0) return res.status(404).json({ message: "Orden no encontrada" });
        res.status(200).json({ message: "Orden eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la orden", error: error.message });
    }
};
