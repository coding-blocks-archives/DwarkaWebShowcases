const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
//require db file
const db = require('./config/db');
//body parser middleware
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//set the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


//set up the public folder
app.use('/public', express.static(path.join(__dirname, '/public')));


app.listen(port, () => {
    console.log(`listening to server on ${port}`);
    db.connect(() => {
        console.log('connected to mongodb');

        //set the route
        app.use('/', require('./routes/todo'));
    });
});