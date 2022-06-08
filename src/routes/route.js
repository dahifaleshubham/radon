const express = require('express');
const router = express.Router();
const BookModel = require("../models/bookModel")
const AuthorModel= require("../models/authorModel")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/createAuthor", BookController.createAuthor)

router.post("/createBook", BookController.createBook)

router.get("/getBooksbyChetanBhagt", BookController.getBooksbyChetanBhagt)

router.get("/authorofBook", BookController.authorofBook)

router.get("/findBook", BookController.findBook)
 
module.exports = router;