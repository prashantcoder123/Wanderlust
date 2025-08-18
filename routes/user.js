const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport= require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controllers/users.js");

//signup form, signup-> listing
router.route("/signup")
.get(usercontroller.renderSignupForm)
.post(wrapAsync(usercontroller.signup));

//login form , login ->listing
router.route("/login")
.get(usercontroller.renderLoginForm)
.post(
saveRedirectUrl,
passport.authenticate('local', 
{ failureRedirect: '/login',
  failureFlash: true 
}),
usercontroller.login
);

router.get("/logout",usercontroller.logout);


module.exports = router;