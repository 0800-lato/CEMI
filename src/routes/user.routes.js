const express = require("express");
const router = express.Router();
const {
  register,
  processRegister,
  login,
  processLogin,
  profile,
  updateProfile,
  logout,
  editProfile,
} = require("../controllers/userController");
const registerValidator = require("../validations/registerValidator");

// /users
router
  .get("/register", register)
  .post("/register", registerValidator, processRegister)
  .get("/login", login)
  .post("/login", processLogin)
  .get("/profile", profile)
  .get("/edit", editProfile)
  .put("/update", updateProfile)
  .get("/logout", logout);

module.exports = router;
