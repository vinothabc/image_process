var express = require('express');
// var fs = require('fs');
var app = express();
// app.set('view engine','ejs');
// app.use(express.static('public'));
/*app.get('/', function(req, res){
   fs.readFile('index.html', 'utf8', function(err, text){
   	return res.send(text)
   })
});
app.get('/about', function(req, res){
   fs.readFile('about-us.html', 'utf8', function(err, text){
   	return res.send(text)
   })
});

app.get('/home',function (argument,res) {
	return res.send('<h1>asdasd<h1/>')
})
app.get('/test',function (argument,res) {
	return res.render('test');
})*/
var zds;
app.get('/user/signup/:id',function(arg,res){
	var product_id = arg.params.id;
	console.log('asd',arg.params);
	var obj =[{id:1,name:'first_name'},{id:2,name:'second_name'}]
	var sdf = obj.forEach(function(sda,as){
		// console.log('23',sda,product_id)
		if(product_id==sda.id){
			var zds =sda.name;
			return sda.name;
		}
	});

	// alert(sdf);
})

app.listen(3000);