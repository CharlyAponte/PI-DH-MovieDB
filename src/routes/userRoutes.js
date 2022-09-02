const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/user/login", userController.login);
router.post("/user/login", userController.processLogin);

router.get("/logout", userController.logout);

module.exports = router;
