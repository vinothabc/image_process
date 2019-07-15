var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';


module.exports = {
	GetOneFile : function(image_name){
		return MongoClient.connect(url).then(function(db){
			dbo = db.db("mydb");
			var image_coooection = dbo.collection('image');
			return image_coooection.find({'name':image_name}).toArray();
		}).then(function(item){
			return item[0];
		});
	}
}
