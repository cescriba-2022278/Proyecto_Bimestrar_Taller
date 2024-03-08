import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from './usuario.model.js';

export const getUsuario = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        usuarios,
    });
}

export const registrarUsuario = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });


    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(200).json({
        usuario,
    });
}

export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({ _id: id });

    res.status(200).json({
        usuario,
    });
}

export const actualizarUsuario = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, correo, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync(); 
        rest.password = bcryptjs.hashSync(password, salt);
    }

    await Usuario.findByIdAndUpdate(id, rest);

    const usuario = await Usuario.findOne({ _id: id });

    res.status(200).json({
        msg: 'Usuario Actualizado',
        usuario,
    });
}

export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioAEliminar = await Usuario.findById(id);

        if (!usuarioAEliminar) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        if (req.usuario.role !== 'ADMIN_ROLE') {
            return res.status(403).json({ mensaje: 'No tienes permiso para realizar esta acción' });
        }

        if (usuarioAEliminar.role !== 'CLIENT_ROLE') {
            return res.status(403).json({ mensaje: 'Solo se pueden eliminar usuarios con rol CLIENT_ROLE' });
        }

        // Elimina el usuario
        await Usuario.findByIdAndDelete(id);

        res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
    }
};
