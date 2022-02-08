const mongoose = require("mongoose");

const DB="mongodb+srv://satheesh:12345@laundry-service.z8cn2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(DB,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then(()=>{
  console.log("connection established")
}).catch(err=>{
  console.log(err)})
