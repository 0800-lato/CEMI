module.exports = {
  index: (req, res) => {
    return res.render("home");
  },
  requests: (req, res) => {
    return res.render("admin");
  },
  users: (req, res) => {
    return res.render("admin/users");
  },
};