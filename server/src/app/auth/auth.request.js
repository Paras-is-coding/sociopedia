const bcrypt = require('bcrypt');
const { generateRandomString } = require('../../config/helper');

class AuthRequest{
    body;
    file;
    files;

    constructor(req){
        this.body = req.body;
        this.file = req.file;
        this.files = req.files;
    }

    transformRequestData = ()=>{
        const payload = this.body;

        // if(this.file){
        //     payload.picturePath = this.file.filename;
        // }
        // if(this.files){
        //     payload.picturePath = this.files.map((file)=>file.filename);
        // }


        payload.viewedProfile = Math.floor(Math.random()*1000);
        payload.impressions =Math.floor(Math.random()*1000);


     
        payload.status = 'inactive'
        payload.token = generateRandomString();

        return payload;
    }

}


module.exports = AuthRequest;

