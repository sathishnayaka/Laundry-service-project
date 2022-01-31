 const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


const Userschema = new Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            
        },
        password : {
            type : String,
            required : true
        },
        phone : {
            type : Number,
            required : true,
            unique : [true,'phone number already exits']
        },
        district : {
            type : String,
            required : true
        },
        state : {
            type : String,
            required : true
        },
        pincode : {
            type : Number,
            length : 6
        },
        address : [String
        ],
        token : String
    }
);

Userschema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports=mongoose.model("Users",Userschema)