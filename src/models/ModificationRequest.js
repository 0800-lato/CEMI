const mongoose = require("mongoose");

const modifcationRequest = new mongoose.Schema({
  name: String,
  description: String,
  profileImage: String,
  coverImage: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  entrepreneurship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entrepreneurship",
  },
});

module.exports = mongoose.model("ModifcationRequest", modifcationRequest);
