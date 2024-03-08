import { Router } from 'express';
import { 
    crearFactura, 
    obtenerFacturasPorUsuario, 
    editarFactura, 
    eliminarFactura 
} from './factura.controller.js';

const router = Router();

router.post("/crear", crearFactura);

router.get("/usuario/:idUsuario", obtenerFacturasPorUsuario);

router.put("/:id/editar", editarFactura);

router.delete("/:id/eliminar", eliminarFactura);

export default router;