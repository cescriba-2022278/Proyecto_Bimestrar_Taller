import { Schema, model} from 'mongoose';

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"]
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"]
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "CLIENT_ROLE"],
    default: 'CLIENT_ROLE'
  },
  estado: {
    type: Boolean,
    default: true
  }
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default model('Usuario', UsuarioSchema);