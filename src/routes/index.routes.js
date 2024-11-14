const express = require("express");
const router = express.Router();
const indexController = require('../controllers/indexController')


const {index, requests, users, contact} = require("../controllers/indexController.js");
const adminCheck = require("../middlewares/adminCheck.js");

router
.get("/", index)
.get("/admin", adminCheck, requests)
.get("/admin/users", users)
.get("/contact", contact)
.get("/admin/categories",indexController.categories)

module.exports = router;
