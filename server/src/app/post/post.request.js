
class PostRequest{
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
        if(this.file){
            payload.picturePath = this.file.filename;
        }
        if(this.files){
            payload.picturePath = this.files.map((file)=>file.filename);
        }

        return payload;
    }

}


module.exports = PostRequest;

