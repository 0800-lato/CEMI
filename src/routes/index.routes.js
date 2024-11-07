const express = require("express");
const router = express.Router();

const { index, requests, users } = require("../controllers/indexController.js");

router.get("/", index).get("/admin", requests).get("/admin/users", users);

module.exports = router;
