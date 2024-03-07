import rolesPredefinidos from './src/role/rolePredefinido.js';
import Role from './src/role/role.model.js';

import { config } from "dotenv";
config();
import Server from './configs/server.js';

const server = new Server();

server.listen();

export const inicializarRoles = async () => {
    try {
        // Recorre la lista de roles predefinidos
        for (const rol of rolesPredefinidos) {
            // Verifica si el rol ya existe en la base de datos
            const rolExistente = await Role.findOne({ nombre: rol.nombre });

            // Si el rol no existe, créalo automáticamente
            if (!rolExistente) {
                await Role.create(rol);
            }
        }
        console.log('Roles inicializados correctamente');
    } catch (error) {
        console.error('Error al inicializar roles:', error);
    }
};