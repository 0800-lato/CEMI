 const {validationResult} = require('express-validator');
 const {hashSync} = require('bcryptjs');
 const {getData, storeData} = require('../data');


module.exports = {
  register : (req,res) => {
      return res.render('users/register')
  },
  processRegister : (req,res) => {

      const errors = validationResult(req);
      const {name, email, entrepeneurshipname, password, description} = req.body;
      const users = getData('users.json');

      if(errors.isEmpty()){
          const newUser = {
              id: +users[users.length - 1].id + 1,
              name,
              entrepeneurshipname,
              email,
              password : hashSync(password, 12),
              description,
              rol : 'user'
          }

          users.push(newUser);

          storeData(users, 'users.json')
          return res.redirect('/')
      }else {
          return res.render('register',{
              old : req.body,
              errors : errors.mapped()
          })
      }
  },
  login : (req,res) => {

      return res.render('login')
  },
  processLogin : (req,res) => {
      const users = getData('users.json');
      const {email, pass} = req.body;        

      const user = users.find(user => user.email == email)
      
      if(user && compareSync(pass, user.password)) {

          req.session.userLogin = {
              id : user.id,
              name : user.name,
              rol : user.rol
          }

          return user.rol == "admin" ? res.redirect('/admin') : res.redirect("/")
      }else {
          return res.render('login',{
              msg : "Credenciales inválidas"
          })
      }
            

  },
  profile : (req,res) => {
      return res.render('profile')
  },
  updateProfile : (req,res) => {
    return res.render('profile')
},
  logout : (req,res) =>{
      req.session.destroy()
      return res.redirect('/')
  }
} 