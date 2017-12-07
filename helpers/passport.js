var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var users = require('./users.js');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done){
    console.log(username, password);
    users.findOne(username, function(err, user){
        console.log(err, user);
        if(err){
            return done(err)
        } else {
            if(!user[0]){
                return done(null, false, {message: "No user found"});
            } else if(user[0].password != password){
                return done(null, false, {message: "Wrong password"});
            }
            return done(null, user[0]);
        }
    })
}));
module.exports = passport;