const EntrepreneurShip = require("../models/EntrepreneurShip.js");

module.exports = {
  index: (req, res) => {
    return res.render("home");
  },
  requests: async (req, res) => {
    const entrepreneurships = await EntrepreneurShip.find({
      active: false,
    })
      .populate("user")
      .populate("category")
      .exec();
    return res.render("admin/requests", {
      entrepreneurships,
    });
  },
  users: (req, res) => {
    return res.render("admin/users");
  },
};
