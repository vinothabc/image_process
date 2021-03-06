//image_process.js
var Jimp = require('jimp');
const sharp = require('sharp');
var fs = require('fs');


module.exports = {

	crop : async function(path,width,height,save_path) {
		const image = await Jimp.read(path); 
		image.crop(500,500,width, height, function(err){ 
		    if (err) throw err; 
		}) 
		.write(save_path);
		return save_path; 
	},
	resize : async function(path,width,height,save_path) {
		try{
		const image = await sharp(path)
					  .resize(width, height, {
					    fit: 'contain',
					    background: { r: 255, g: 255, b: 255, alpha: 0.5 }
					  })
					  .toFile(save_path);
		return save_path; 
		}
		catch(e){
			console.log(e);
			return e;
		}
	}
}