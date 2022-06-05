const UserModel= require("../models/userModel")

const createNewbook= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getAllBook= async function (req, res) {
    let allBooks= await UserModel.find()
    res.send({msg: allBooks})
}

module.exports.createNewbook= createNewbook
module.exports.getAllBook= getAllBook