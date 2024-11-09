const mongoose = require("mongoose");

const entrepreneushipSchema = new mongoose.Schema({
  name: String,
  description: String,
  profileImage: String,
  coverImage: String,
  active: Boolean,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Entrepreneuship", entrepreneushipSchema);
