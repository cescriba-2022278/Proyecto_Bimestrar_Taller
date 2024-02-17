const bcryptjs = require('bcryptjs')
const Producto = require('../models/producto');
const { response } = require('express');

const productoPost = async (req, res) => {
    const { nombre, descripcion, precio, cantidad } = req.body;
    const producto = new Producto({ nombre, descripcion, precio, cantidad });
    
    const salt = bcryptjs.genSaltSync();
    producto.preio = bcryptjs.hashSync(precio, salt);

    await producto.save();
    res.status(202).json({ 
        producto 
    });
};

const productoGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        productos
    });
};

const productoById = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findById({_id: id});

    res.status(200).json({ 
        producto 
    });
};

const editProducto = async (req, res = response) => {
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

const deleteProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndDelete(id);
    
    res.status(200).json({ 
        msg: 'Producto eliminado correctamente' ,
        producto
    });

};

module.exports = {
    productoPost,
    productoGet,
    productoById,
    editProducto,
    deleteProducto
};