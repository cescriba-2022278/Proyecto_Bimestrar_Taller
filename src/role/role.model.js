import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String
    }
});

export default mongoose.model('Role', roleSchema);