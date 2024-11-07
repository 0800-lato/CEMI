const { validationResult } = require("express-validator");
const { getData, storeData } = require("../data");
const {getOrderItems, getPagedItems} = require("../helpers");




module.exports = {
    catalog : (req,res) => {
        const entrepreneurships = getData("entrepreneurships.json");
        const totalPages = Math.ceil(entrepreneurships.length / 12);
        const page = req.query.page || 1
        return  res.render('entrepreneurship/catalog', {
          entrepreneurships: getPagedItems(entrepreneurships, page, 12),
          totalPages,
          page
        });
       
    },
    detail : (req,res) => {

    },
    search : (req,res) => {

    },
    filter : (req,res) => {
        
        const entrepreneurships = getData("entrepreneurships.json");
        const entrepreneurshipsFilter = entrepreneurships.filter (entrepreneurship => entrepreneurship.category === req.query.category )
        const totalPages = Math.ceil(entrepreneurships.length / 12);
        const page = req.query.page || 1
        return  res.render('entrepreneurship/catalog', {
          entrepreneurships: getPagedItems(entrepreneurshipsFilter, page, 12),
          totalPages,
          page
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