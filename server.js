const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app=require('./app'); 
const dbConnection=require('./config/mongodb'); 

dbConnection; 

const PORT=process.env.PORT; 
app.listen(PORT,()=>{
    console.log(`app is listening on port ...!`,PORT); 
}); 