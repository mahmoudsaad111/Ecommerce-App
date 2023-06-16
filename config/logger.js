const winston=require('winston'); 


const dateFormat = () =>{
    return new Date(Date.now()).toLocaleString();
}


const logger = winston.createLogger({
    format: winston.format.printf(info=>{
        let message=`${dateFormat()} | ${info.level.toUpperCase()} | ${info.message}`; 
        return message
    }),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: `${process.env.NODE_PATH}/logs/error.log`, level: 'error' }),
      new winston.transports.File({ filename: `${process.env.NODE_PATH}/logs/info.log`,level:"info"}),
    ],
  });


module.exports=logger; 
