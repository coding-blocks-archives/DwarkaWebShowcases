const express = require('express');
 
const app = new express();
const expressEdge = require('express-edge');
const path = require("path");         // path is a PACKAGE
const edge = require("edge.js");
const mongoose = require('mongoose');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const dbuser= "uditgoel";
const dbpassword= "uditgoel123";
const conString = `mongodb://${dbuser}:${dbpassword}@ds163255.mlab.com:63255/blogproject`
const auth = require("./middleware/auth");
mongoose.connect(conString, { useNewUrlParser: true })
    .then(() => console.log('You are now connected to Mongo!'))
    .catch(err => console.error('Something went wrong', err))

    const connectFlash = require("connect-flash");
    const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const port= process.env.PORT || 5000;
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const expressSession = require('express-session');
const loginUserController = require('./controllers/loginUser');
const createPostController = require('./controllers/createPost');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
const authorization= require('./middleware/authorization')
const logoutController = require("./controllers/logout");
var mongoos = require('mongoose');
const userob = require('./database/models/User')
var userobj={};
app.use(bodyParser.json())
app.use(connectFlash());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
const mongoStore = connectMongo(expressSession);
app.use(express.static('public'));
app.use(expressEdge);
app.set('views', __dirname + '/views');

app.use(expressSession({
    secret: 'secret',
    resave:false,
  saveUninitialized: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
});
var mongoobjectid;

app.use("/",express.static(path.join(__dirname,"public")));

app.get('/home', redirectIfAuthenticated,(req, res) => {
   mongoobjectid= req.session.userId;
   var mongoObject = mongoos.Types.ObjectId(mongoobjectid);
    userob.findById(mongoObject, (error, user) => {
        if (user) {
           userobj= user;
           
        }
    if(error){console.log(error);}})
   Post.find({mids:mongoobjectid},(error,posts) =>{
       if(error){console.log(error);}
       
       res.render('index', { posts: posts,userob:userobj})
       
   })
  
});  




app.get("/auth/logout", auth, logoutController);
app.get("/auth/register", authorization,createUserController);
app.post("/users/register", storeUserController);

app.get("/auth/login", authorization,loginController);
app.get("/posts/new", auth, createPostController);

app.post('/users/login',loginUserController.authenticate);
app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
});

app.post('/posts/store', (req, res) => {
    Post.create({mids:mongoobjectid,title:req.body.title,description:req.body.description,content:req.body.content,username:req.body.username,createdAt:req.body.createdAt}, (error, post) => {
       if(error){console.log(error);};
        res.redirect('/home')
    })
});

app.listen(port,function(){console.log(`Listening at ${port}`);

});

