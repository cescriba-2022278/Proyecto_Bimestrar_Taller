import { Router } from 'express';
import { check } from 'express-validator';
import { 
    productoPost, 
    productoGet, 
    productoById, 
    editProducto, 
    deleteProducto } from './producto.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get("/", productoGet);

router.get("/:id", productoById);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("descripcion", "La descripción no puede estar vacía").not().isEmpty(),
        check("precio", "El precio debe ser un número válido").isNumeric(),
        check("cantidad", "La cantidad debe ser un número válido").isNumeric(),
        validarCampos
    ],
    productoPost
);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check("descripcion", "La descripción no puede estar vacía").not().isEmpty(),
        check("precio", "El precio debe ser un número válido").isNumeric(),
        check("cantidad", "La cantidad debe ser un número válido").isNumeric(),
        validarCampos
    ],
    editProducto
);

router.delete("/:id", deleteProducto);

export default router;