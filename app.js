import Role from './src/role/role.model.js';

import { config } from "dotenv";
config();
import Server from './configs/server.js';

const server = new Server();

server.listen();

export const rolesPredefinidos = [
    { role: 'ADMIN_ROLE', descripcion: 'Administrador' },
    { role: 'CLIENT_ROLE', descripcion: 'Cliente' }
];

const inicializarRoles = async () => {
    try {
        for (const role of rolesPredefinidos) {
            const roleExistente = await Role.findOne({ role: role._id });

            if (!roleExistente) {
                await Role.create(role);
                console.log(`Role '${role}' creado automáticamente.`);
            }
        }
    } catch (error) {
        console.error('Error al inicializar roles:', error);
    }
};

inicializarRoles();