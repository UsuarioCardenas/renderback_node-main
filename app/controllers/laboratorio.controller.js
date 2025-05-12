import db from '../models/index.js';

const { laboratorio: Laboratorio } = db;

export const createLaboratorio = async (req, res) => {
    try {
        const { nombre, direccion, telefono } = req.body;
        const nuevo = await Laboratorio.create({ nombre, direccion, telefono });
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el laboratorio", error: error.message });
    }
};

export const getLaboratorios = async (_req, res) => {
    try {
        const laboratorios = await Laboratorio.findAll();
        res.status(200).json(laboratorios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los laboratorios", error: error.message });
    }
};

export const getLaboratorioById = async (req, res) => {
    try {
        const laboratorio = await Laboratorio.findByPk(req.params.id);
        if (!laboratorio) return res.status(404).json({ message: "Laboratorio no encontrado" });
        res.status(200).json(laboratorio);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el laboratorio", error: error.message });
    }
};

export const updateLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Laboratorio.update(req.body, { where: { id } });
        if (updated === 0) return res.status(404).json({ message: "Laboratorio no encontrado" });
        res.status(200).json({ message: "Laboratorio actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el laboratorio", error: error.message });
    }
};

export const deleteLaboratorio = async (req, res) => {
    try {
        const deleted = await Laboratorio.destroy({ where: { id: req.params.id } });
        if (deleted === 0) return res.status(404).json({ message: "Laboratorio no encontrado" });
        res.status(200).json({ message: "Laboratorio eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el laboratorio", error: error.message });
    }
};
