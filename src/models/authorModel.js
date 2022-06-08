const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    author_id:{
        type:String,
        unique:true,
        required:true
    },
    author_name:String,
    age:Number,
    address:String
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
}, { timestamps:true });

module.exports = mongoose.model('Author', authorSchema) 



// String, Number
// Boolean, Object/json, array