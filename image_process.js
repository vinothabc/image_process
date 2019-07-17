//image_process.js
var Jimp = require('jimp');
const sharp = require('sharp');


module.exports = {

	crop_image : async function(path,width,height,save_path) {
		const image = await Jimp.read(path); 
		image.crop(500,500,width, height, function(err){ 
		    if (err) throw err; 
		}) 
		.write(save_path);
		return save_path; 
	},

	resize_image1 : async function(path,width,height,save_path) {
		const image = await Jimp.read(path); 
		image.resize(width, height, function(err){ 
		    if (err) throw err; 
		}) 
		.write(save_path);
		return save_path; 
	},
	resize_image : async function(path,width,height,save_path) {
		const image = await sharp(path)
					  .resize(width, height, {
					    fit: 'contain',
					    background: { r: 255, g: 255, b: 255, alpha: 0.5 }
					  })
					  .toFile(save_path)
					  .then(() => {
							return save_path; 
					  });
		return save_path; 
	}
}