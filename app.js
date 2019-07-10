var express = require('express');
var app = express();
var fs = require("fs");
var formidable = require('formidable');

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: '/tmp/'}));

app.post('/file_upload', function (req, res) {

   var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    console.log(fields,files);
      var oldpath = files.filetoupload.path;
      var newpath = '/home/vinoth/Music/vinoth/files/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.write('File uploaded and moved!');
        res.write('<br><a href="/">Home</a>');
        res.end();
      });
 });
    
/*   console.log(req.files);
   console.log(req.files.file.name);
   console.log(req.files.file.path);
   console.log(req.files.file.type);
   var file = __dirname + "/" + req.files.file.name;
   
   fs.readFile( req.files.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ) {
            console.log( err );
            } else {
               response = {
                  message:'File uploaded successfully',
                  filename:req.files.file.name
               };
            }
         
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });*/
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})