const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser')
//  importing the mongoose data model
const User=require('../Models/User');
const mongoose=require('mongoose');
// for user authentication we use jwt
const jwt = require('jsonwebtoken');
require('dotenv').config(); // configration of dotenv file to access
const { TOKEN_KEY } = process.env;
const verifyToken=require('../Models/Middleware/Auth')
//  connecting to the database
// var db = "mongodb://localhost:27017/User";
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true },()=>{console.log("connected to the database")});
require('../config/dataBase');

const app=express();
router.use(express.json())

const bcrypt=require('bcrypt');
const { Mongoose } = require('mongoose');
const { path } = require('express/lib/application');
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
 



router.get('/users',(req,res) => {
    res.json(users)
})

router.post('/users', async (req,res)=>{
    try{
        if(req.body.name===""){
            return res.json({error : "Please provide your name"})
        }
        if (req.body.email===""){
            return res.json({error : "Please provide your email"})
        }
        const user_1= await User.findOne({email : req.body.email})
        if(user_1){
            return res.json({error : "User already exit"})
        }
        const user_2=await User.findOne({phone : req.body.phone})
        if(user_2){
            return res.json({error : "Phone number already exit"})
        }
        if(req.body.password===""){
            return res.json({error : "please provide a password"})
        }
        if(!req.body.state || !req.body.district || !req.body.pincode || !req.body.address){
            return res.json({error : "please fill the all address fields"})
        }
        console.log(req.body)
        const hashpassword= await bcrypt.hash(req.body.password, 10); //hashing the password 
        console.log(hashpassword)

        
        const user= new User({
            name : req.body.name,
            email : req.body.email,
            password : hashpassword,
            phone : req.body.phone,
            district : req.body.district,
            state : req.body.state,
            pincode : req.body.pincode,
            address : req.body.address
        })
        user.save()
        .then((user)=>{
            res.json({message : "Data is saved successfully"})
            res.status(201).send()
        })
        .catch((e)=>{
            console.log(e);
        })
    }catch(e){
        console.log(e)
    }
    
})

router.post('/users/login', async (req,res)=>{
    console.log(req.body)
    if(!req.body.email || !req.body.password )
    {
        return res.status(422).json({error:"Add all data"})
    }
    if(!isNaN(req.body.email)){
        var user= await User.findOne({phone : req.body.phone})
        if(length.req.body.email!==10){
            return res.json({error : "Please provide a valid phone number"})
        }
    }else{
        var user= await User.findOne({email : req.body.email})
    }
    
    console.log(user)
    if (user===null){
        console.log("cont find the user")
        return res.json({error : "please provide a valid email/phone"})
    }
    try{
        console.log(user.password)
        if (await bcrypt.compare(req.body.password,user.password)){
            const token = jwt.sign({user_id: user._id },TOKEN_KEY,{
                expiresIn : "2h",
            });
            user.token=token
            res.status(200).json(user);
        }else{
            res.json({error : "Incorrect Password"})
            console.log("incorrect password")
        }

    }catch{
        res.status(500).send()
    }
})
router.get('/home',verifyToken,(req,res)=>{
    var user=User.findOne(user=>user._id===req.user)
    res.send("Welcome Home")
})



module.exports=router