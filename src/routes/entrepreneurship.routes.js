const express = require ("express");
const router =  express.Router();
const {catalog,destroy,detail,add,edit,create,filter,search, update} = require('../controllers/entrepreneurshipController');
const upload  = require("../config/multer-config");
const imageUploadMiddleware = require("../middlewares/imageUploadMiddleware");


// /entrepreneurships

router
  .get("/catalog", catalog)
  .get("/detail/:id", detail)
  .get("/filter", filter)
  .get("/search", search)
  .get("/add", add)
  .post("/add", create)
  .get("/edit", edit)
  .put("/update/:id", upload.fields([{name:'coverImage'},{name:'profileImage'}]), imageUploadMiddleware, update)
  .delete("/destroy/:id", destroy);

module.exports = router