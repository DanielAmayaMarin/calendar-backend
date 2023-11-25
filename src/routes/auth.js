/**
 * Rutas de Usuario / Auth
 * hots + /api/auth
 */

const { Router } = require("express");
const {check} = require("express-validator")
const {validarCampos} = require("../middlewares/validar-campos.js")
const { crearUsuario, loginUsuario, revalidarToken } = require("../controllers/auth");
const {validarJWT} = require("../middlewares/validar-jwt.js")

const router = Router();

router.post("/new", [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres minimo').isLength({min: 6}),
    validarCampos
] ,(req, res) => crearUsuario(req, res));

router.post("/",[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres minimo').isLength({min: 6}),
    validarCampos
], (req, res) => loginUsuario(req, res));

router.get("/renew",  validarJWT,  (req, res) => revalidarToken(req, res));

module.exports = router;
