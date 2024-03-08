import { Schema, model } from 'mongoose';

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio'],
    },
    descripcion: {
        type: String
    }
});

export default model('Role', RoleSchema);