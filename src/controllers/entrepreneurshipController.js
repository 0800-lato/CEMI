const { validationResult } = require("express-validator");
const { getData, storeData } = require("../data");
const {getOrderItems, getPagedItems} = require("../helpers");
const EntrepreneurShip = require("../models/EntrepreneurShip.js");
const { isValidObjectId } = require("mongoose");
const Category = require("../models/Category.js");
let entrepreneurshipsFilter;
let keyword;
let category;

module.exports = {
  catalog: async (req, res) => {
    try {
      const entrepreneurships = await EntrepreneurShip.find({
        active: true,
      })
        .populate("user")
        .populate("category");
      const totalPages = Math.ceil(entrepreneurships.length / 12);
      const page = req.query.page || 1;
      return res.render("entrepreneurship/catalog", {
        entrepreneurships: getPagedItems(entrepreneurships, page, 12),
        totalPages,
        page,
        keyword,
        category,
      });
    } catch (error) {
      return res.redirect("/");
    }
  },
  detail: async (req, res) => {
    try {
      const entrepreneurship = await EntrepreneurShip.findById(req.params.id)
        .populate("user")
        .populate("category")
        .exec();
      
      return res.render("entrepreneurship/detail", {
        entrepreneurship,
      });
    } catch (error) {
      return res.redirect("/entrepreneurships/catalog");
    }
  },
  search: (req, res) => {
    const entrepreneurships = getData("entrepreneurships.json");
    keyword = req.query.keyword;
    entrepreneurshipsFilter = entrepreneurships.filter((entrepreneurship) =>
      entrepreneurship.title.toLowerCase().includes(keyword.toLowerCase())
    );
    const totalPages = Math.ceil(entrepreneurshipsFilter.length / 12);
    const page = req.query.page || 1;
    return res.render("entrepreneurship/catalog", {
      entrepreneurships: getPagedItems(entrepreneurshipsFilter, page, 12),
      totalPages,
      page,
      keyword,
    });
  },
  filter: (req, res) => {
    const entrepreneurships = getData("entrepreneurships.json");
    category = req.query.category;
    entrepreneurshipsFilter = entrepreneurships.filter(
      (entrepreneurship) => entrepreneurship.category === category
    );
    const totalPages = Math.ceil(entrepreneurshipsFilter.length / 12);
    const page = req.query.page || 1;
    return res.render("entrepreneurship/catalog", {
      entrepreneurships: getPagedItems(entrepreneurshipsFilter, page, 12),
      totalPages,
      page,
      category,
    });
  },
  add: (req, res) => {
    return res.render("entrepreneurship/add");
  },
  create: (req, res) => {},
  edit: async (req, res) => {
    try {
      const categories = await Category.find()
      const entrepreneurship = await EntrepreneurShip.findOne({
        user : req.session.userLogin.id
      }).populate('category')
      return res.render("entrepreneurship/edit", { 
        categories,
        entrepreneurship
      });
    } catch (error) {
      console.log(error)
      return res.redirect('/')
    }
   
  },
  update: async (req, res) => {
    try {
      const entrepreneurshipUpdated = await EntrepreneurShip.findByIdAndUpdate(req.params.id,req.body,{new : true})
      if(!entrepreneurshipUpdated) throw new Error("ENTREPRENEURSHIP NOT FOUND")
        return res.redirect('/users/profile')
      
    } catch (error) {
      console.log(error)
      return res.redirect('/')
    }
  },
  destroy: (req, res) => {},
};