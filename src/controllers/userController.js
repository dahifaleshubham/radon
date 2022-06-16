const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// - Write a **POST api /users** to register a user from the user details in request body.

const createUser = async function (req, res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  try {
    let data = req.body
    console.log(data)
    if ( Object.keys(data).length != 0) {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.status(201).send({ msg: savedData })
}
else res.status(400).send({ msg: "BAD REQUEST"})
}
catch (err) {
console.log("This is the error :", err.message)
res.status(500).send({ msg: "Error", error: err.message })
}

};

// - Write a ***POST api /login** to login a user that takes user details 
//- email and password from the request body.
// If the credentials don't match with any user's data return a suitable error.
// On successful login, generate a JWT token and return it in response body. 

const loginUser = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let userPassword = req.body.password;
  
  let user = await userModel.findOne({ emailId: userName, password: userPassword });
  if (!user)
    return res.status(403).send({
      status: false,
      msg: "username or the password is not corerct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "radon",
      organisation: "FunctionUp",
      // exp: (Date.now()/1000)+ 60*180 
    },
    "functionup-radon"
  );
  
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, token: token });
    }
    catch (err) {
      console.log("This is the error :", err.message)
      res.status(500).send({ msg: "Error", error: err.message })
      }
};

//- Write a **GET api /users/:userId** to fetch user details.
// Pass the userId as path param in the url. 
//Check that request must contain **x-auth-token** header.
// If absent, return a suitable error.
//If present, check that the token is valid.

const getUserData = async function (req, res) {
  try{
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(404).send({ status: false, msg: "No such user exists" });

  res.status(200).send({ status: true, data: userDetails });
  }catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
    }
};

//- Write a **PUT api /users/:userId** to update user details.
// Pass the userId as path param in the url and update the attributes received in the request body.
// Check that request must contain **x-auth-token** header. If absent, return a suitable error.

const updateUser = async function (req, res) {
  try{
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ status: false, msg: "No such user exists" });
    }
  
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    res.status(200).send({ status: true, data: updatedUser });
   } catch (err) {
      console.log("This is the error :", err.message)
      res.status(500).send({ msg: "Error", error: err.message })
      }  
  };

  //- Write a **DELETE api /users/:userId** that takes the userId in the path params and
  // marks the isDeleted attribute for a user as true.
  // Check that request must contain **x-auth-token** header. If absent, return a suitable error.
  
  const deleteUser = async function (req, res) {
    try{
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ status: false, msg: "No such user exists" });
    }
    let deletedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set:{isDeleted:true}},{new:true});
    res.status(201).send({ status: true, data: deletedUser });
  }catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
    }
  };   

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser