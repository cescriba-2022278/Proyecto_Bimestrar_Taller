import { Schema, model } from 'mongoose';

const ProductoSchema = Schema({
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

export default model('Producto', ProductoSchema);