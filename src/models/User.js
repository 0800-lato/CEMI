const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  phone: String,
  country: String,
  password: String,
  photo: String,
  networks: Array,
  role: String,
  validate: Boolean,
  token: String,
});

module.exports = mongoose.model("User", userSchema);
