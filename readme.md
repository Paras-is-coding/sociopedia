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
     <!-- - @mui/material @emotion/react @emotion/styled @mui/icons-material ->Material UI -->   not used for now


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



...
