import { request, response } from 'express';
import Factura from './factura.model.js';

export const crearFactura = async (req = request, res = response) => {
    try {
        const { usuario, productos, total } = req.body;
        const nuevaFactura = new Factura({ usuario, productos, total });
        const facturaGuardada = await nuevaFactura.save();
        res.status(201).json({
            msg: 'Compra realizada con exito',
            facturaGuardada
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerFacturasPorUsuario = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const facturas = await Factura.find({ usuario: idUsuario });
        res.json(facturas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para editar una factura existente
export const editarFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const { productos, total } = req.body;
        const facturaActualizada = await Factura.findByIdAndUpdate(id, { productos, total }, { new: true });
        if (!facturaActualizada) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        res.json(facturaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para eliminar una factura existente
export const eliminarFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const facturaEliminada = await Factura.findByIdAndDelete(id);
        if (!facturaEliminada) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        res.json({ message: 'Factura eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};