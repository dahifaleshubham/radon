const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//- Once, all the apis are working fine, move the authentication related code in a middleware called auth.js

const middleAuth = function (req, res,next) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    
    //If no token is present in the request header return error
    if (!token) return res.send({ status: false, msg: "token must be present" }),next();
    
    let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" }),next();

    else next();
  };

  module.exports.middleAuth = middleAuth