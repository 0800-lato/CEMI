const { check, body } = require("express-validator");
const { getData } = require("../data");
const users = getData("users.json");

/* implementa base de datos */
const User = require("../models/User.js");

module.exports = [
  /* emprendedora */
  check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("Solo caracteres alfabéticos"),

  check("surname")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("Solo caracteres alfabéticos"),

  check("country").notEmpty().withMessage("El país es requerido"),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Debe ser un email válido")
    .bail()
    .custom(async (value, { req }) => {
      const user = await User.find({ email: value });
      if (user) {
        return false;
      }
      return true;
    })
    .withMessage("El email ya se encuentra registrado"),

  check("phone").notEmpty().withMessage("El telefono de contacto es requerido"),

  check("password")
    .notEmpty()
    .withMessage("El password es obligatorio")
    .bail()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Debe tener una mayúscula, minúscula, caracter especial y un número. Mínimo 8 caracteres"
    ),

  body("password2")
    .notEmpty()
    .withMessage("Reingresá tu contraseña")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage("Las contraseñas no coinciden 2"),

  /* emprendimiento */
  check("entrepeneurshipname")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail(),

  check("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .bail()
    .isLength({ min: 20 })
    .withMessage("Mínimo 20 caracteres"),

  check("category")
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .bail(),
];
