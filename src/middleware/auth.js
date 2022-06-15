const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//- Once, all the apis are working fine, move the authentication related code in a middleware called auth.js

const middleAuth = function (req, res,next) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    
    //If no token is present in the request header return error
    if (!token) return res.send({ status: false, msg: "token must be present" })
    
    let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" })

    next();
  };

  const midAuthorisation = async function (req, res, next){

    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");
    
    //userId for which the request is made. In this case message to be posted.
    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

    let user = await userModel.findById(req.params.userId)
    if(!user) return res.send({status: false, msg: 'No such user exists'})

    next()
  }
 
  module.exports.middleAuth = middleAuth
  module.exports.midAuthorisation = midAuthorisation 