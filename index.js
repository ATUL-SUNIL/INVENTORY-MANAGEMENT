import express from 'express';
import productController from './src/controllers/product.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts'
import userController from './src/controllers/user.controller.js';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { auth } from './src/middlewares/auth.middleware.js';
import session from 'express-session';
import { UploadFile } from './src/middlewares/file-upload.middleware.js';
const server= express();
server.use(session({
    secret:'secretkey',
    resave:false,
    saveUninitialized: true,
    cookie:{secure:false},
})
);
//parse form data
server.use(express.urlencoded({extended:true}));
//setup view engine settings
server.set("view engine","ejs")
//dirextory to where views are
server.set("views",path.join(path.resolve(),"src",'views')) 

server.use(ejsLayouts)

server.use(express.static("public"));
// creating instance of product controller\
const ProductController=new productController();
// creating instance of user controller\
const UserController=new userController();

server.get('/register',UserController.getRegister);
server.get('/login',UserController.getLogin);
server.post('/register',UserController.postRegister);
server.post('/login',UserController.postLogin);
server.get('/logout',UserController.logout);

server.get("/",auth,ProductController.getProducts);
server.get('/new',auth,ProductController.getAddForm)

server.post('/',auth,UploadFile.single('imageUrl'),validationMiddleware,ProductController.addNewProduct)

server.get('/update-product/:id',auth,ProductController.getUpdateProductView)

server.post('/update-product',auth,ProductController.postUpdateProduct)

server.use(express.static("src/views"));

server.post("/delete-product/:id",auth,ProductController.deleteProduct)

server.listen(3100,()=>{
    console.log("listening at port 3100");
});