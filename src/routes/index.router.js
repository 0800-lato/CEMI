const express = require ("express");
const router =  express.Router();

router.get("/", (req,res) => res.render("home"));
router.get("/admin/requests", (req,res) => res.render("admin-requests"));
router.get("/catalog", (req,res) => res.render("catalog"));
/**(RUTAS RECIEN AGREGADAS) */
router.get("/products-detail",(req,res)=> res.render("product-detail")); 
router.get("/login", (req,res) => res.render("login"));
router.get("/register", (req,res) => res.render("register"));
router.get("/admin/users", (req,res) => res.render("admin-users"));

module.exports = router