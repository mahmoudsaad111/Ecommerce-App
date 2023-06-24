const winston=require('winston'); 

const logger = winston.createLogger({
    format:winston.format.combine(
      winston.format.timestamp(),  
      winston.format.json()  
    ),
    transports: [
      new winston.transports.File({ filename: `${process.env.NODE_PATH}/logs/error.log`, level: 'error' }),
      new winston.transports.File({ filename: `${process.env.NODE_PATH}/logs/info.log`,level:"info"}),
    ],
  });


module.exports=logger; 
