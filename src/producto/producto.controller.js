import Producto from './producto.model.js';
import Categoria from '../categoria/categoria.model.js';
import { request, response } from 'express';

export const agregarProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, cantidad, categoria } = req.body;
        const categoriaEncontrada = await Categoria.findOne({ nombre: categoria });
        if (!categoriaEncontrada) {
            return res.status(400).json({ error: 'La categoría especificada no existe' });
        }

        const producto = new Producto({ nombre, descripcion, precio, cantidad, categoria: categoriaEncontrada._id });
        await producto.save();

        res.status(201).json({ producto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const productoGet = async (req = request, res = response) => {
    try {
        const { categoria } = req.query;
        let query = {};
        if (categoria) {
            const categoriaEncontrada = await Categoria.findOne({ nombre: categoria });

            if (!categoriaEncontrada) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            query.categoria = categoriaEncontrada._id;
        }
        const productos = await Producto.find(query).populate('categoria');

        res.json({ productos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const productoById = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById({_id: id});

    res.status(200).json({ 
        producto 
    });
};

export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, cantidad, categoria } = req.body;
        const producto = await Producto.findByIdAndUpdate(id, { nombre, descripcion, precio, cantidad, categoria }, { new: true });
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto actualizado correctamente', producto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndDelete(id);
    
    res.status(200).json({ 
        msg: 'Producto eliminado correctamente' ,
        producto
    });

};

export const obtenerProductosPorCategoria = async (req, res) => {
    try {
        const { nombreCategoria } = req.params;

        // Busca la categoría por su nombre
        const categoria = await Categoria.findOne({ nombre: nombreCategoria });
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        // Busca los productos asociados a la categoría por su ObjectId
        const productos = await Producto.find({ categoria: categoria._id });

        res.json({ productos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const venderProducto = async (req = request, res = response) => {
    try {
        const ventaCantidad = req.body.cantidad;
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        if (producto.cantidadDisponible < ventaCantidad) {
            return res.status(400).json({ error: 'Cantidad insuficiente en inventario' });
        }
        producto.cantidadDisponible -= ventaCantidad;
        producto.ventas += ventaCantidad;
        await producto.save();
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerProductosMasVendidos = async (res = response) => {
    try {
        const productos = await Producto.find().sort({ ventas: -1 }).limit(10);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};