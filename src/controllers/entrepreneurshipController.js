const { validationResult } = require("express-validator");
const { getData, storeData } = require("../data");
const {getOrderItems, getPagedItems} = require("../helpers");
let entrepreneurshipsFilter;
let keyword;
let category;


module.exports = {
    catalog : (req,res) => {
        const entrepreneurships = entrepreneurshipsFilter ? entrepreneurshipsFilter : getData("entrepreneurships.json");
        const totalPages = Math.ceil(entrepreneurships.length / 12);
        const page = req.query.page || 1
        return  res.render('entrepreneurship/catalog', {
          entrepreneurships: getPagedItems(entrepreneurships, page, 12),
          totalPages,
          page,
          keyword,
          category
        });
       
    },
    detail : (req,res) => {

    },
    search : (req,res) => {
        const entrepreneurships = getData("entrepreneurships.json");
        keyword = req.query.keyword
        entrepreneurshipsFilter = entrepreneurships.filter(entrepreneurship => entrepreneurship.title.toLowerCase().includes(keyword.toLowerCase()))
        const totalPages = Math.ceil(entrepreneurshipsFilter.length / 12);
        const page = req.query.page || 1
        return  res.render('entrepreneurship/catalog', {
          entrepreneurships: getPagedItems(entrepreneurshipsFilter, page, 12),
          totalPages,
          page,
          keyword
        });
    },
    filter : (req,res) => {
        
        const entrepreneurships = getData("entrepreneurships.json");
        category= req.query.category;
        entrepreneurshipsFilter = entrepreneurships.filter (entrepreneurship => entrepreneurship.category === category )
        const totalPages = Math.ceil(entrepreneurshipsFilter.length / 12);
        const page = req.query.page || 1
        return  res.render('entrepreneurship/catalog', {
          entrepreneurships: getPagedItems(entrepreneurshipsFilter, page, 12),
          totalPages,
          page,
          category
        });
    },
    add : (req,res) => {
        return res.render('entrepreneurship/add')

    },
    create : (req,res) => {

    },
    edit : (req,res) => {
        return res.render('entrepreneurship/edit')

    },
    update : (req,res) => {

    },
    destroy : (req,res) => {

    }
}