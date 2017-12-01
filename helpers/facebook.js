var passport = require('passport'), FacebookStrategy = require('passport-facebook');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// passport setting
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "https://home-restaurant.herokuapp.com/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done){
    return done(null, profile);
})
);;


module.exports = passport;



