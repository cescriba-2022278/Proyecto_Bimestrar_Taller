import Producto from './producto.model.js';
import { request, response } from 'express';

export const productoPost = async (req, res) => {
    const { nombre, descripcion, precio, cantidad, categoria} = req.body;
    const producto = new Producto({ nombre, descripcion, precio, cantidad, categoria});

    await producto.save();
    res.status(202).json({ 
        producto 
    });
};

export const productoGet = async (req = request, res = response) => {
    try {
        const { limite, desde, categoria } = req.query;
        let query = {};
    
        if (categoria) {
            query.categoria = categoria;
        }
    
        const productos = await Producto.find(query)
            .skip(Number(desde)) 
            .limit(Number(limite)) 
    
        res.status(200).json({
            total: productos.length, 
            productos
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las empresas', error: error.message });
    }
};

export const productoById = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findById({_id: id});

    res.status(200).json({ 
        producto 
    });
};

export const editProducto = async (req, res = response) => {
    const { id } = req.params;
    const { descripcion, precio, cantidad, ...resto } = req.body;

    try {
        const productoActualizado = await Producto.findByIdAndUpdate(id, { descripcion, precio, cantidad, ...resto }, { new: true });

        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ 
            msg: 'Producto actualizado exitosamente',
            producto: productoActualizado 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndDelete(id);
    
    res.status(200).json({ 
        msg: 'Producto eliminado correctamente' ,
        producto
    });

};