const express = require ("express");
const router =  express.Router();

router.get("/", (req,res) => res.render("home"));
router.get('/product-detail', (req,res) => res.render("product-detail"));

module.exports = router