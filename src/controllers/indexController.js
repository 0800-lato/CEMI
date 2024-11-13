const EntrepreneurShip = require("../models/EntrepreneurShips.js");
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
      return res.render("/")
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
      return res.render("/")
    }
  },
  
};
