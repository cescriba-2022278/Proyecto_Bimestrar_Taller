const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { productoPost, productoGet, productoById, editProducto, deleteProducto } = require('../controllers/producto.controller');

const router = Router();

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

router.get("/", productoGet);

router.get("/:id", productoById);

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

module.exports = router;