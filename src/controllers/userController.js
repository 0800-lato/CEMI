const { validationResult } = require("express-validator");
const { hashSync, compareSync } = require("bcryptjs");
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
        networks: networks.filter((net) => net != ""),
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
        user: user._id,
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
  processLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        email
      });
      
      if (user && compareSync(password, user.password)) {
        req.session.userLogin = {
          id: user.id,
          name: user.name,
          rol: user.role,
        };
  
        return user.role == "admin" ? res.redirect("/admin") : res.redirect("/users/profile");
      } else {
        return res.redirect('/')
      }
    } catch (error) {
      console.log(error);
      
      return res.redirect('/')

    }

  
  },
  profile: async (req, res) => {
    try {
      const user = await User.findById(req.session.userLogin.id)
      const entrepreneurship = await EntrepreneurShip.findOne({
        user : user.id
      }).populate('category')      
      return res.render("users/user-profile", {
        user,
        entrepreneurship

      });
    } catch (error) {
      console.log(error)
      return res.redirect('/')
    }
  
  },
  editProfile: async (req, res) => {

    try {
      const user = await User.findById(req.session.userLogin.id)
     
      return res.render("users/edit-profile",{
        user,
      });
    } catch (error) {
      console.log(error)
      return res.redirect('/')
    }
  
  },
  updateProfile: async (req, res) => {

    try {
      const userUpdated = await User.findByIdAndUpdate(req.session.userLogin.id,req.body,{new: true})
      if(!userUpdated) throw new Error('USER NOT FOUND')
      return res.redirect("/users/profile");
    } catch (error) {
      console.log(error)
      return res.redirect('/')
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },
};
