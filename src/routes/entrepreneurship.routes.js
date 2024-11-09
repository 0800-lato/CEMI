const express = require ("express");
const router =  express.Router();
const {catalog,destroy,detail,add,edit,create,filter,search, update} = require('../controllers/entrepreneurshipController')

// /entrepreneurships

router
  .get("/catalog", catalog)
  .get("/detail/:id", detail)
  .get("/filter", filter)
  .get("/search", search)
  .get("/add", add)
  .post("/add", create)
  .get("/edit/:id?", edit)
  .put("/update/:id", update)
  .delete("/destroy/:id", destroy);

module.exports = router