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
        type: Number,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    estado:{
        type: Boolean,
        default: true
    }
});

export default model('Producto', ProductoSchema);