var express = require('express');
var router = express.Router();
var users = require('../helpers/users.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.render('signUp');
});

router.post('/', function(req, res, next){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    
    if(password == confirmPassword){
        
        users.create(name, email, password, function(err, store_id){
        if(err){
            next(new Error("Error creating user"));
        } else {
            req.redirect('/login')
        }
    });
    }
    else{
        
    }
});

module.exports = router;
