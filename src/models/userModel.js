const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name:String,
    balance: {
        type: Number,
    defalut:100
    },
    address: { 
        type: String },
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"] //"falana" will give an error
    },
    isFreeAppUser: {
        type: Boolean,
        default: false
    },
    age: Number,
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users



// String, Number
// Boolean, Object/json, array