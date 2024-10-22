const path = require('path');

// está bien esto?
const usersController = {
  register: (req, res) => {
    res.render('registro'); 
  }
};

module.exports = usersController;