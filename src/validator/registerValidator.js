const { check, body } = require("express-validator");
const {getData} = require('../data')
const users = getData('users.json')

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio").bail()
    .isAlpha()
    .withMessage("Solo caracteres alfabéticos"),
    check("entrepeneurshipname")
    .notEmpty()
    .withMessage("El nombre es obligatorio").bail(),
    
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Debe ser un email válido").bail()
    .custom((value, {req}) => {
        const user = users.find(user => user.email == value)
        if(user){
            return false
        }
        return true
    }).withMessage("El email ya se encuentra registrado"),
  check("password")
    .notEmpty().withMessage("El password es obligatorio").bail()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage('Debe tener una mayúscula, minúscula, caracter especial y un número. Mínimo 8 caracteres'),
  body("password2")
  .notEmpty().withMessage("Reingresá tu contraseña").bail()
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      return false
    }
    return true;
  })
  .withMessage('Las contraseñas no coinciden 2'),
  check("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria").bail()
    .isLength ({min: 20})
    .withMessage("Solo caracteres alfabéticos"),
];
