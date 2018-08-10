const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();


const ideas = require('./routes/ideas');
const users = require('./routes/users');


require('./config/passport')(passport);


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/videos', {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


app.use(methodOverride('_method'));


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});





app.use('/ideas', ideas);
app.use('/users', users);

const port=5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});