const express = require('express');
const router = express.Router();
const UserModel = require("../models/userModel.js")
const UserController = require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("Welcome Shubham")
})

router.post("/createBook", UserController.createNewbook )

router.get("/getBooks", UserController.getAllBook)

module.exports = router;