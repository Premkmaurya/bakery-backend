const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');

router.post("/register",authController.userRegister)
router.post("/login",authController.userLogin)


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route that Google will redirect to after authentication
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleAuthCallback
);


module.exports = router;