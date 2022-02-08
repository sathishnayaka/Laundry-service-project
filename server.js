const express = require('express');
const app=express()
const cors=require('cors');
var Login=require('./routers/Login');

app.use(cors({
    origin : "*"
}
    
))

app.use('/',Login)

app.listen(3001,()=>{console.log("App is Listening at 3001")})