const multer = require('multer');
const fs = require('fs')

// storage dir and unique filename setup
const myStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const path = req.uploadDir ?? "./public/uploads";
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{recursive:true})
        }
        cb(null,path);
    },
    filename:(req,file,cb)=>{
        const random = Math.ceil(Math.random()*9999);
        const ext = file.originalname.split('.').pop();
        const filename = Date.now() + random + "." + ext;

        cb(null,filename);
    }
})


// file filter here 
const imageFilter = (req,file,cb)=>{
    const ext = file.originalname.split('.').pop();
    let allowed = ['jpg','jpeg','png','gif','svg','bmp','webp','jfif'];
    if(allowed.includes(ext.toLowerCase())){
        cb(null,true);
    }else{
        cb({code:400,message:"File format not supported!"},null)
    }
}



// uploader 
const uploader = multer({
    storage:myStorage,
    fileFilter:imageFilter,
    limits:{
        fileSize:3000000
    }
})


module.exports = uploader