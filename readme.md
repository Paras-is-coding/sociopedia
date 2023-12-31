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

- API- '/login' 
     - create '/login' route
     - create login controller middleware,
          - create findUserByFilter auth.service and return userDetails
          - if exist use bcrypt to compare passwords from req.body and userDetails.password
          - if match generate jwt token and send 200 response else send respective error


# authorization 

* checkLogin middleware
     - After logging in for every route that needs login we'll send jwt token on request and checkLogin middleware will verify the token
     - middlewares/auth.middleware.js/
          - checkLogin middleware -> getToken_jwt verify token_check if userexist_append authUser to req
     - now we'll use this middleware before heading to controller midd. of auth router aftr login


# user component API-routes
- creating user CRUD routes, controller and all
- we have route for getUser, getUserFriends, addRemoveFriend in userRouter

# posts component API-routes
- created createPost, getAllPosts and getUserPosts API-routes
- created likePost API route
     - take postId and userId, find post and see on it's like if userId is there, IF removes it IfNOT adds it and returns updatedPost



# Begin frontend 
- vite app setup and cleanup

# dependencies install
- `npm i react-redux @reduxjs/toolkit redux-persist react-dropzone dotenv formik yup react-router-dom @mui/material @emotion/react @emotion/styled @mui/icons-material`

     - react-redux @reduxjs/toolkit ->State management lib, toolkit for easy use of redux
     - redux-persist ->Store states to localstorage when needed
     - react-dropzone ->Handle fileupload and filehandeling in frontend
     - dotenv ->Environment variables
     - formik ->Form handeling
     - yup ->Validation
     - react-router-dom ->Handeling different routes
     - @mui/material @emotion/react @emotion/styled @mui/icons-material ->Material UI


# giving structure for code 
- scenes/  ->Folders for defining sections where we setup layout for our components
- components/ ->Make our reusable components here
- state/ ->Redux setup for state management  

# added redux 
- create store, authSlice, add reducer to store and wrap app component with provider store


# Redux Persist
- Added redux-persixt
- redux-persist is a library designed for persisting and rehydrating state in Redux applications.
 It seamlessly integrates with Redux to store the state in various storage engines, 
 enabling the preservation of application state across page reloads, app restarts, or device reboots.



# theme file
- added theme file, color setup for project