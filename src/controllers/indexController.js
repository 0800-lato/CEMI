const Category = require("../models/Category.js");
const EntrepreneurShip = require("../models/EntrepreneurShip.js");
const User = require("../models/User.js");

module.exports = {
  index: (req, res) => {
    return res.render("home");
  },
  contact: (req, res) => {
    return res.render("contact");
  },
  requests: async (req, res) => {
    try {
      const entrepreneurships = await EntrepreneurShip.find({
        active: false,
      })
        .populate("user")
        .populate("category")
        
      return res.render("admin/requests", {
        entrepreneurships,
      });
    } catch (error) {
      console.log(error)
      return res.redirect("/")
    }
  },
  users: async (req, res) => {
    try {
      const users = await User.find()
      return res.render("admin/users",{
        users
      });
    } catch (error) {
      console.log(error)
      return res.redirect("/")
    }
  },
  categories : async (req,res) => {
    try {
      const categories = await Category.find()
      return res.render("admin/categories",{
        categories
      });
    } catch (error) {
      console.log(error)
      return res.redirect("/")
    }
  }
  
};
