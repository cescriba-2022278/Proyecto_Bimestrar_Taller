import Categoria from './categoria.model.js';
import Producto from '../producto/producto.model.js';

export const agregarCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        const categoriaExistente = await Categoria.findOne({ nombre });
        if (categoriaExistente) {
            return res.status(400).json({ error: 'La categoría ya existe' });
        }
        const categoria = new Categoria({ nombre });
        await categoria.save();
        res.status(201).json({ categoria });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const verCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json({ categorias });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const categoria = await Categoria.findById(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        categoria.nombre = nombre;
        await categoria.save();
        res.json({ mensaje: 'Categoría actualizada correctamente', categoria });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findById(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        await Producto.updateMany({ categoria: categoria._id }, { $unset: { categoria: 1 } });
        await categoria.remove();
        res.json({ mensaje: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};