const bcrypt = require('bcrypt')

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
        let {password,...rest} = this.body;
        const payload = rest;

        const hashedPassword = bcrypt.hashSync(password,10);
        payload.password = hashedPassword;

        payload.viewedProfile = Math.floor(Math.random()*1000);
        payload.impressions =Math.floor(Math.random()*1000);


        if(this.file){
            payload.picturePath = this.file.filename;
        }
        if(this.files){
            payload.picturePath = this.files.map((file)=>file.filename);
        }

        return payload;
    }

}


module.exports = AuthRequest;

