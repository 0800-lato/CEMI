const { validationResult } = require("express-validator");
const { hashSync } = require("bcryptjs");
const { getData, storeData } = require("../data");

/* implementa base de datos */
const Category = require("../models/Category.js");
const User = require("../models/User.js");
const EntrepreneurShip = require("../models/EntrepreneurShip.js");

module.exports = {
  register: async (req, res) => {
    const categories = await Category.find();

    return res.render("users/register", {
      categories,
    });
  },
  processRegister: async (req, res) => {
    /* obtengo las validaciones */
    const errors = validationResult(req);

    /* obtengo los datos de la emprendedora */
    const { name, surname, country, email, phone, password, networks } =
      req.body;

    /* obtengo los datos del emprendimiento */
    const {
      entrepeneurshipname,
      description,
      category,
      profileImage,
      coverImage,
    } = req.body;

    if (errors.isEmpty()) {
      const newUser = new User({
        name,
        surname,
        email,
        phone,
        country,
        password: hashSync(password, 12),
        networks,
        role: "user",
        validate: false,
      });

      const user = await newUser.save();

      const newEntrepreneurship = new EntrepreneurShip({
        name: entrepeneurshipname,
        description,
        profileImage,
        coverImage,
        active: false,
        category,
        user,
      });

      await newEntrepreneurship.save();

      return res.redirect("/");
    } else {
      const categories = await Category.find();

      return res.render("users/register", {
        categories,
        old: req.body,
        errors: errors.mapped(),
      });
    }
  },
  login: (req, res) => {
    return res.render("login");
  },
  processLogin: (req, res) => {
    const users = getData("users.json");
    const { email, pass } = req.body;

    const user = users.find((user) => user.email == email);

    if (user && compareSync(pass, user.password)) {
      req.session.userLogin = {
        id: user.id,
        name: user.name,
        rol: user.rol,
      };

      return user.rol == "admin" ? res.redirect("/admin") : res.redirect("/");
    } else {
      return res.render("login", {
        msg: "Credenciales inválidas",
      });
    }
  },
  profile: (req, res) => {
    const users = getData("users.json");
    return res.render("users/user-profile", {
      user: users[0],
    });
  },
  editProfile: (req, res) => {
    return res.render("users/edit-profile");
  },
  updateProfile: (req, res) => {
    return res.render("profile");
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },
};
