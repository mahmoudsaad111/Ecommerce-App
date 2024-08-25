const mongoose=require('mongoose'); 
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const logger=require('./logger'); 


const connectionString=process.env.MONGODB_ATLAS.replace('<db_password>',process.env.MONGODB_PASSWORD);

module.exports=mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    logger.info("connected to database ...!"); 
}).catch((err)=>{
    logger.error(err.message); 
    process.exit(1); 
}); 

