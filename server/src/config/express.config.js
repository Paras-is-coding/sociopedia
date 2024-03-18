const express = require('express')
const cors = require('cors');
const router = require('../router/index.js');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const { ZodError } = require('zod');
const { MulterError } = require('multer');

const app = express();

// cors allow domain
app.use(cors({origin:process.env.CORS_ORIGIN}))

// helmet and morgan for safety and logging
app.use(helmet());
app.use(helmet.contentSecurityPolicy({policy:"cross-origin"}));

app.use(express.static('public/uploads'));
  
  
app.use(morgan("common"));

// connect to db
require('./db.config.js');

// parsing different data formats
app.use(express.json({limit:"30mb"}));
app.use(express.urlencoded({extended:true,limit:"30mb"}))

// mount app router
app.use("/api/v1",router);

// 404 error handler
app.use((req,res,next)=>{
    res.status(404).json({
        result:null,
        message:"Page not found!",
        meta:null
    })
});

// error handleling middleware
app.use((error,req,res,next)=>{
    let code = error.code ?? 500;
    let message = error.message ?? "Internal server error!";
    let result = error.result ?? null;

    if(error instanceof MulterError){
        if(error.code === 'LIMIT_FILE_SIZE'){
            code = 400;
            message = error.message;
        }
        message = `Multer error ${error.message}`
        code = 400;
        
        // similarly other multer errors are handled here
    }

    if(error instanceof ZodError){
        // in error.errors we get array of objects of errors
        // in err.path[0] we get name of field on which error occured
        code = 400;
        let msg ={};
        error.errors.map((err)=>{
            msg[err.path[0]] = err.message
        })
        
        message = "Validation failure!";
        result = msg;
    }

    // Handle 11000 error of mongoose 
    // reusing email where email field doesnot allow duplicate 
    if(error.code === 11000){
        code = 400;
        let uniqueKeys = Object.keys(error.keyPattern)
        message = uniqueKeys.map((key)=> key + "should be unique");
        result = req.body
    }

    res.status(code).json({
        result:result,
        message:message,
        meta:null
    })

})

module.exports = app;