
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/mydb';
var multer = require('multer');
var Jimp = require('jimp');
var promise = require('promise');
var fs = require('fs');


/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  // db.close();
});*/
/*
MongoClient.connect(url,function(error,db){
  if(error)
    throw error;
  var dbo = db.db("mydb");
  dbo.createCollection("users",function(err,res){
    if(err)
      throw err;  
    console.log("collection created");
    db.close();
  })
})*/

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});
router.post('/fileUpload', upload.single('image'), (req, res, next) => {
  // var db = client.db('mytestingdb');
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        insertDocuments(db,req.file.filename, () => {
            console.log(req.file.filename);
            db.close();
            res.json({'status_message':1,'status_message': 'File uploaded successfully','image':req.file.filename});
        });
    });
});
module.exports = router;
var insertDocuments = function(db, file_name, callback) {
    var dbo = db.db("mydb");
    var collection = dbo.collection('image');
    collection.insertOne({'name' : file_name }, (err, result) => {
        assert.equal(err, null);
        callback(result);
    });
}




router.get('/get_files', function(req,res) {
  MongoClient.connect(url, (err, db) => {
    if(!req.query.image)
       res.json({'status_message':0,'status_message': 'Invalid image'});
    image = req.query.image;
    width = parseInt(req.query.width);
    height = parseInt(req.query.height);
    var dbo = db.db("mydb");
    var collection = dbo.collection('image');
    var file = '';
var promise = new Promise(function(resolve, reject) {
    
   
     collection.findOne({'name':image},function(err,res1){
        org_image = res1.name;

        if(req.query.crop=='crop')
         file = crop_image('./uploads/'+org_image,width,height);
        if(req.query.crop=='resize')
         file = resize_image('./uploads/'+org_image,width,height);


    });
      setTimeout(function() {
        resolve(file);
    }, 5000);
});
  promise.then(function(file) {
    fs.readFile(file, function(err, data) {
    if (err) throw err; // Fail if the file can't be read.
    else {
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.end(data); // Send the file data to the browser.
    }
  });

      // res.json({'status_message':1,'status_message': 'Success image','file':data})
       // console.log(data);
});
    
    }); 

});

async function crop_image(data,width,height) { 
  var save_path = './cache/crop/'+Date.now()+'.png';
  const image = await Jimp.read(data); 
// crop function using callback function 
  image.crop(500,500,width, height, function(err){ 
    if (err) throw err; 
  }) 
  .write(save_path);
  return save_path; 

}

async function resize_image(data,width,height) { 
  var save_path = './cache/resize/'+Date.now()+'.png';
  const image = await Jimp.read(data); 
// crop function using callback function 
  image.resize(width, height, function(err){ 
    if (err) throw err; 
  }) 
  .write(save_path);
  return save_path; 

}