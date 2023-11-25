/**
 * Evets Routes
 * /api/event
 */

const { Router } = require("express");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events.js");
const { validarJWT } = require("../middlewares/validar-jwt.js");
const { check } = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos.js");
const { isDate } = require("../helpers/isDate.js");
const router = Router();

router.use(validarJWT);

router.get("/", getEventos);

router.post("/", [
    check('title', "El titulo es obligatorio ").not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de inicio es obligatoria').custom(isDate),
    validarCampos
] , crearEvento);

router.put("/:id",
[
    check('title', "El titulo es obligatorio ").not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de inicio es obligatoria').custom(isDate),
    validarCampos
] , actualizarEvento);

router.delete("/:id", eliminarEvento);

module.exports = router;
