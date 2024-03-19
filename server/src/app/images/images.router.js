const express = require('express');
const ImageRouter = express.Router();
const path = require('path');

// Serve posts image route
ImageRouter.get('/posts/:imageName', (req, res,next) => {
    try {
    const imagePath = path.join(__dirname, '../../../public/uploads/posts', req.params.imageName);
    res.sendFile(imagePath);
        
    } catch (error) {
        next(error);
        
    }
});

// Serve user image route
ImageRouter.get('/user/:imageName', (req, res,next) => {
    try {
        const imagePath = path.join(__dirname, '../../../public/uploads/user', req.params.imageName);
        console.log("path is ...........",imagePath)
    res.sendFile(imagePath);
    } catch (error) {
        next(error)        
    }
    
});

module.exports = ImageRouter;
