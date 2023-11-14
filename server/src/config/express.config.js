const express = require('express')
const cors = require('cors');
const router = require('../router/index.js');
const { default: helmet } = require('helmet');
const morgan = require('morgan');

const app = express();

// cors allow domain
app.use(cors({origin:process.env.CORS_ORIGIN}))

// helmet and morgan for safety and logging
app.use(helmet());
app.use(helmet.contentSecurityPolicy({policy:"cross-origin"}));
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
app.use((err,req,res,next)=>{
    let code = err.code || 500;
    let result = err.result || null;
    let message = err.message || "Internal server error!";
    let meta = err.meta || null;

    res.status(code).json({
        result,
        message,
        meta
    })
})

module.exports = app;