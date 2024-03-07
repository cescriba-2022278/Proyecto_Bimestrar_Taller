import { Router } from 'express';
import { check } from 'express-validator';
import { 
    agregarProducto, 
    productoGet, 
    productoById, 
    actualizarProducto, 
    deleteProducto,
    obtenerProductosPorCategoria } from './producto.controller.js';
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
        check("categoria", "categoria del producto necesaria").not().isEmpty(),
        validarCampos
    ],
    agregarProducto
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
    actualizarProducto
);

router.delete("/:id", deleteProducto);

router.get('/productos/categoria/:nombreCategoria', obtenerProductosPorCategoria);

export default router;