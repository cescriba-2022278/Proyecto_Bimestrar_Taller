import express from 'express';
import { check } from 'express-validator';
import { 
    agregarCategoria, 
    verCategorias, 
    editarCategoria, 
    eliminarCategoria 
} from './categoria.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = express.Router();

router.get("/", verCategorias);

router.post(
    "/",
    [
        check("nombre", "El nombre de la categoría es requerido").not().isEmpty(),
        validarCampos
    ], agregarCategoria);

router.put(
    "/:id",
    [
        check("nombre", "El nombre de la categoría es requerido").not().isEmpty(),
        validarCampos
    ], editarCategoria);

router.delete("/:id", eliminarCategoria);

export default router;
