/**
 * Created by sandeep on 12/07/17.
 */

var fs = require('fs');

function readFormContent(cb) {
    fs.readFile('contactIndex.txt',function (err, data) {
        if (err) throw err;

        var cont = data.toString();

        cb(cont);
    });

}

function writeFormContent(details,cb) {
    fs.writeFile('contactIndex.txt' , JSON.stringify(details), function (err) {
        if(err) throw err;
        console.log("saved in file");
    });
    cb();
}

module.exports = {
    write : writeFormContent,
    read : readFormContent
}

