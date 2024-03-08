import { Router } from "express";
import { check } from "express-validator";
import {
    getUsuario,
    registrarUsuario,
    getUsuarioById,
    actualizarUsuario,
    eliminarUsuario,
} from "./usuario.controller.js";
import {
  existenteEmail,
  esRoleValido,
  existeUsuarioById,
} from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", getUsuario);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ], getUsuarioById
  );

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "Este no es un correo válido").isEmail(),
    check("correo").custom(existenteEmail),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({min: 6}),
    check("role").custom(esRoleValido),
    validarCampos
  ],  registrarUsuario);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ], actualizarUsuario);

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ], eliminarUsuario);

export default router;

