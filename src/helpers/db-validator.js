import Producto from '../producto/producto.model.js';
import Usuario from '../usuario/usuario.model.js';
import Role from '../role/role.model.js';

export const existenteProductoById = async (id = '') => {
    const existenteProducto = await Producto.findOne({ id });

    if(existenteProducto){
        throw new Error(`El producto ${id} ya fue registrado`);
    }
}

export const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });

    if (!existeRol) {
        throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

export const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El ID: ${id} No existe`);
    }
}
