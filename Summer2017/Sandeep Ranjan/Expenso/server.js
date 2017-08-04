/**
 * Created by sandeep on 13/07/17.
 */

var express = require('express');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');
var multer  = require('multer');
var fsys = require('fs');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure : false,
    auth: {
        user: '***********',
        pass: '************'
    }
});
var upload = multer({ dest: 'public_static/uploads/' });



var path = require('path');

var mysql = require('./mysql.js');

var fs = require('./files.js');
var database = require('./database');

var app = express();
var user="";


app.use('/',express.static(path.join(__dirname,'public_static')));

app.use(cookieParser());
app.use(session({
    secret: 'kjBoadho34thw',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.post('/forget', function (req,res) {

    mysql.getDetails(req.body.email, function (data) {
        if (JSON.stringify(data) === '[]') {
            res.send('Email not in use');
        }

        else {

            var mailOptions = {
                from: 'flameboy.sr18@gmail.com',
                to: req.body.email,
                subject: 'Expenso Froget Password',
                text: 'Your Expenso Password is: '+data[0].password
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send('Plese Check Your Email :D..!')
                }
            });

        }


    });
});

app.post('/upload', upload.single('upfile'), function (req, res, next) {
    console.log(req.file.originalname);
    var file = req.file.originalname;

    var tmp_path = req.file.path;
    var target_path = 'public_static/uploads/' + req.file.originalname;

    var src = fsys.createReadStream(tmp_path);
    var dest = fsys.createWriteStream(target_path);
    src.pipe(dest);

    database.picture(file ,function () {
        res.redirect('/app.html');
    });


});




app.post('/contact', function (req,res) {

    var details = [] ;
        fs.read(function (cont) {
            if(cont !== '') {
                details = JSON.parse(cont);
            }
            details.push(req.body);
            fs.write(details,function () {
                res.send('done');
            });
        });

}); // LANDING PAGE CONTACT FORM

app.post('/send',function (req,res) {

    mysql.getDetails(req.body.email,function (data) {
        if(JSON.stringify(data) !== '[]') {res.send('Email Already in use');}
        else {
            mysql.signUp(req.body,function (resl) {
                console.log(resl);
                res.send('Thank');
            });

        }
    });

}); //SIGN UP USER AND VERIFICATION

app.post('/log',function (req,res) {


    mysql.getDetails(req.body.email,function (data) {

        if(JSON.stringify(data) === '[]') { res.send('Email Incorrect'); }
        else {
            if(req.body.password !== data[0].password) {res.send('Invaild Password');}
            else {

                req.session.email = req.body.email;
                user = req.body.email;
                //res.render(__dirname + './public_static/app.html');
                //res.render(path.join(__dirname+'./public_static/app.html'));
                var ob = {email : user, key : "thanks"}
                res.send(ob);

            }
        }


    });


});




app.get('/app',function (req,res) {

   if(!req.session.email) {
       res.redirect('/login');
   }
   else {
       res.redirect('/app.html');
   }
});

app.get('/logout', function (req, res) {

    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });

});


app.get('/app/expenso/name',function (req,res) {
    console.log(req.query);
    mysql.getDetails(req.query.user,function (data) {
        res.send(data[0].name);
    });
});





app.get('/app/expenso/get', function (req, res) {

            database.get(req.query, function (data) {
                res.send(data);
            });
        }); //DETAILS OF ID PASSED

app.post('/app/expenso/settings', function (req, res) {
            database.settingsForm(req.body, function (data) {
                res.send(data);
            });

        }); //SETTINGS DETAILS

app.post('/app/expenso/transaction', function (req, res) {
            database.insertT(req.body, function (data) {
                res.send(data);
            })
        }); //ADD TRANSACTIONS

app.post('/app/expenso/pending', function (req, res) {
            database.insertP(req.body, function (data) {
                res.send(data);
            })
        }); //ADD PENDING

app.post('/app/expenso/deletepass', function (req, res) {
            database.deletePassbook(req.body, function (data) {
                res.send(data);
            });
        }); //DELETE PASSBOOK

app.post('/app/expenso/deletepend', function (req, res) {
            console.log(req.body);
            database.deletePending(req.body, function (data) {
                res.send(data);
            });
        });

app.post('/app/expenso/editpass',function (req,res) {
    database.editPassbook(req.body,function (data) {
        res.send(data);
    });
});

app.post('/app/expenso/editpend',function (req,res) {
    database.editPending(req.body,function (data) {
        res.send(data);
    });
});






database.connectDB(function () {
    app.listen(4000 || process.env.port,function (err) {
        if(err) throw err;
        console.log('server is running');
    });


});




