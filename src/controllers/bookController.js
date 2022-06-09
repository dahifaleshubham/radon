const { send } = require('express/lib/response');
const mongoose = require('mongoose');
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const isValidObjectId = function (objectId){
        return mongoose.Types.ObjectId.isValid(objectId)

}

const createBook= async function (req, res) {
    let book = req.body
    let author_id =req.body.author_id
    let publisher_id = req.body.publisher_id
    if(!author_id){
    return res.send({msg:"author_id is requied"})

    }
    if(!isValidObjectId){
        return res.send({msg:"author_id is not valid"})
    }
    if(!publisher_id){
        return res.send({msg:"publisher_id is requied"})
    
        }
        if(!isValidObjectId){
            return res.send({msg:"publisher_id not valid"})
        }


    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorPublisherDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate(['author_id','publisher_id'])
    res.send({data: specificBook})

}
const getBooksWithAllDetails = async function (req, res) {
    let book = await bookModel.find().populate(['author_id','publisher_id'])
    res.send({data: book})

}
module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorPublisherDetails = getBooksWithAuthorPublisherDetails
module.exports.getBooksWithAllDetails = getBooksWithAllDetails