const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    name: String, 
    author_id:{
        type:String,
        unique:true,
        required:true
    },
    prices: {
        indianPrice: Number
    },
    rating:Number,
    
}, {timestamps: true });



module.exports = mongoose.model('Book', bookSchema) 

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
