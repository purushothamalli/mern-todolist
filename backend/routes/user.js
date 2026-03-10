const express = require("express");
const router = express.Router();
const {
    loginUser,
    signupUser,
    refreshUser,
    logoutUser,
} = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/refresh", refreshUser);
router.post("/logout", logoutUser);
module.exports = router;
