const mongoose=require('mongoose'); 
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const connectionString=process.env.MONGODB_ATLAS.replace('<password>',process.env.MONGODB_PASSWORD);

module.exports=mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("connected to database ...!"); 
}).catch((err)=>{
    console.log(err); 
    process.exit(1); 
}); 

