# Initial setup
- server/
     `npm i express body-parser bcrypt cors dotenv gridfs-stream multer multer-gridfs-storage helmet morgan jsonwebtoken mongoose`
     `npm init -y` -> initialize new Node.js project, generate package.json file
    - express -> backend library
    - body-parser -> to process req. body
    - bcrypt -> for password encryption
    - cors -> handleling cross origin requests
    - dotenv -> for environment variables
    - gridfs-stream, multer, multer-gridfs-storage -> for fileuploading locally
    - helmet -> for request safety
    - morgan -> for logging info about requests
    - jsonwebtoken -> for authenication
    - mongoose -> for mongodb access

    
- index.js/
     - create Node.js server using http, mount app and listen to the server

- src/config/
     - express.config.js
          - create express app, cors, require dbconfig, parse req data formats, mount app router 404 handle, error handeling middleware and export app
     - db.config.js
          - connect mongodb using mongoose
- src/router/
     - create express router and export

- middlewares/uploader.middleware.js/
     - multer uploader middleware setup, later we'll uploader.single|array('key') in route to store file
     - Note: we receive file in req.file|files


# auth component begin

* src/app/auth/
     - we'll manage seperate controller, model, router and services file for auth component|functionality

- API- '/register' of auth 
     - created '/register' route at auth.router.js, used uploader before controller midd. we may upload picture
     - created UserModel at user.model.js we'll store some of info of user there while registering
     - now register midd. of auth.controller.js
          - first of req is send to auth.request.js for transformation, i.e adding additionl fields, hashPsw and more
          - then payload is sent to auth.services.js to store them in DB
     - Now our register API- route is completed



