const bookModel = require("../Models/bookModel");
const userModel = require("../Models/userModel");
const mongoose = require('mongoose')
const reviewModel=require("../models/reviewModel")
const aws= require("aws-sdk")




// ========================================[AWS APi]==============================================================//

aws.config.update({
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",
    secretAccessKey: "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",
    region: "ap-south-1"
})


let uploadFile = async (file) => {
   return new Promise( function (resolve, reject) {
    // this function will upload file to aws and return the link
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  //HERE
        Key: "abc/" + file.originalname, //HERE 
        Body: file.buffer
    }


    s3.upload( uploadParams, function (err, data) {
        if (err) {
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })

    // let data= await s3.upload( uploadParams)
    // if( data) return data.Location
    // else return "there is an error"

   })
}



// ==> POST api : to generate bookCover URL

const generateURL = async function (req, res) {
    try {
        let files = req.files
        if(!files || files.length === 0) return res.status(400).send({ status: false, message: "No cover image found." })
            //upload to s3 and get the uploaded link
        let bookCoverURL= await uploadFile( files[0] )
        return res.status(201).send({ status: true, message: 'Success', data: bookCoverURL })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



// ========================================[createBook]==============================================================
const createBook = async function (req, res) {

    try {
        res.setHeader('Access-Control-Allow-Origin', '*')
        let data = req.body;
        //let { title, excerpt, userId, ISBN, category,reviews, subcategory, releasedAt,bookCover } = data;
        let createBook = await bookModel.create(data);
        res.status(201).send({ status: true, message: 'Success', data: createBook })

    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }

}

// =========================================[getBookByQuery]===============================================================


const validateString = function (name) {
    if (typeof name == undefined || typeof name == null) return false;
    if (typeof name == "string" && name.trim().length == 0) return false;
    return true;
};

let isValidObjectId = function (ObjectId) {
    return mongoose.isValidObjectId(ObjectId)
}
const getBooks = async function (req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*')
        const queryData = req.query
        let obj = { isDeleted: false }
        if (Object.keys(queryData).length !== 0) {
        let { userId, category, subcategory } = queryData

            if (userId) {
                if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Invalid userId" })}
                obj.userId = userId
            }
            if (category && validateString(category)) { obj.category = category}
            if (subcategory && validateString(subcategory)) { obj.subcategory = { $in: subcategory } }

        }
        let find = await bookModel.find(obj).select({ ISBN: 0, subcategory: 0, createdAt: 0, updatedAt: 0, __v: 0, isDeleted: 0 })
        find.sort(function(a,b){return a.title.localeCompare(b.title)})
        if (find.length == 0) {
            return res.status(404).send({ status: false, message: "No such book found" })
        }
        res.status(200).send({ status: true, message: "Book List", data: find })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

// =============================================[get-book-by-id]===========================================================================

const getBookById = async function (req, res) {

    try {
        res.setHeader('Access-Control-Allow-Origin', '*')
         let bookId = req.params.bookId
         bookId=bookId.trim()

         if(!bookId){ return res.status(400).send({status:false,message:"BookId is require"})}
         if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: "invalid bookid" }) }
       
         const checkbook = await bookModel.findById(bookId)

         if (!checkbook) return res.status(404).send({ status: false, message: "No book found" })
      //  const {title,excerpt,userId,category,subcategory,isDeleted,reviews,releasedAt,createdAt,updatedAt} =checkbook
        const reviewData = await reviewModel.find({bookId:bookId,isDeleted:false})
        const countReview = await reviewModel.find({bookId:bookId,isDeleted:false}).count()

        let finalResult = {
            title: checkbook.title, excerpt: checkbook.excerpt, userId: checkbook.userId, category: checkbook.category, subcategory: checkbook.subcategory,
            isDeleted: checkbook.isDeleted, reviews:countReview , releasedAt: checkbook.releasedAt, createdAt: checkbook.createdAt, updatedAt: checkbook.updatedAt, reviewData: reviewData
        }

        return res.status(200).send({ status: true, message: 'Books ', data: finalResult });

    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}



// ==============================================[updateBook]=================================================================

const updateBook = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*')
        let Id = req.params.bookId
        Id=Id.trim()

        if (!Id) return res.status(400).send({ status: false, msg: "plz provide bookId" })

        let data = req.body
        let { title, excerpt, releasedAt, ISBN } = data

        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, message: "Invalid Parameters" })

        if ((!mongoose.isValidObjectId(Id))) {
            return res.status(400).send({ status: false, msg: "Book Id is Invalid" })
        }

        let book = await bookModel.findById(Id)
        if (!book) {
            return res.status(404).send({ status: false, msg: `User with Id- ${Id} is not present in collection` })
        }
        if (book.isDeleted == true) {
            return res.status(400).send({ status: false, msg: 'Document already deleted' })
        }

        const titleExist = await bookModel.findOne({ title: title })

        if (titleExist) {
            return res.status(400).send({ status: false, msg: "Title already exits" })
        }

        const isbnExist = await bookModel.findOne({ ISBN: ISBN })

        if (isbnExist) {
            return res.status(400).send({ status: false, msg: "ISBN already exits" })
        }

        let updatedBook = await bookModel.findOneAndUpdate(
            { _id: Id, isDeleted: false },
            {
                title: title,
                excerpt: excerpt,
                releasedAt: releasedAt,
                ISBN: ISBN,
            }, { new: true },
        )
        return res.status(200).send({ status: true, message: 'Success', data: updatedBook })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
// ==========================================[deleteBook]===============================================================
const deleteBook = async function (req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*')
        let bookId = req.params.bookId
        
        bookId=bookId.trim()

        if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: "invalid bookId,Please Enter Valid bookId" }) }

        let data = await bookModel.find({ _id: bookId, isDeleted: false })
        if (data.length > 0) {
            let DeleteBlog = await bookModel.findOneAndUpdate({ _id: bookId }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
            res.status(200).send({ status: true, message: "successfully deleted", data: DeleteBlog })
        }
        else return res.status(400).send({ status: false, msg: "already deleted" })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}



module.exports = { generateURL,createBook, getBooks, getBookById, updateBook, deleteBook ,validateString}
