const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    precio:{
        type: String,
        required: true
    },
    cantidad:{
        type: String,
        required: true
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Producto', ProductoSchema);