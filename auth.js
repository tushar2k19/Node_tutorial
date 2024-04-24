const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;    //username and password strategy
const Person = require('./models/Person.js')

passport.use(new LocalStrategy(async (username, password, done) => {
    console.log("inside auth.js, passport");
    try {
        console.log("creds = ", username , password);
        const user = await Person.findOne({username: username});
        if(!user)
        return done(null, false, {message: "Incorrect username"})

        const match = await user.comparePassword(password);
        if(match)
        return done(null, user)
        else  return done(null, false, {message: "incorrect password"})
    }catch (e) {
        console.log(e)
        return done(null, false, {message: e.message})
    }
}));

module.exports = passport