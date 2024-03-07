import { Schema, model } from 'mongoose';

const facturaSchema = Schema({
    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    productos: [{ 
        producto: { 
            type: Schema.Types.ObjectId, 
            ref: 'Producto', required: true 
        },
        cantidad: { 
            type: Number, 
            required: true 
        }
    }],
    total: { 
        type: Number, 
        required: true 
    },
    fecha: { 
        type: Date, 
        default: Date.now 
    }
});

export default model('Factura', facturaSchema);