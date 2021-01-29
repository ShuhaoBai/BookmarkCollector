const express = require("express");
const router = express.Router();
const data = require("../data");;
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const xss = require("xss");
const user = data.userData;

router.get("/", async (req, res) => {
    if (req.session.passport) {
        res.redirect('/dashboard');
    } else {
        res.render("static/login", {title: "Login"});
    }
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    } ,  
    async function (email, password, done) {
        const emailAddress =  xss(email);
        const userPass =  xss(password);
        const result = await user.findUserByEmail(emailAddress);
        if (result === null) {
            return done(null, false, { message: 'unknown user' });
        } else {
            const isMatch = await user.comparePassword(userPass, result.hashedPassword);
            if (isMatch) {
                return done(null, result);
            } else {
                return done(null, false, { message: 'invalid password' });
            }
        }
    }
));

passport.serializeUser(async function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    const userInfo = await user.getUserById(id);
    done(null, userInfo);
});


router.post('/',
    passport.authenticate('local', {failureRedirect: '/login', failureFlash: true }),
     async function(req, res) {
       res.redirect('/dashboard');
});


module.exports = router; 