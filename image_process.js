//image_process.js
var Jimp = require('jimp');


module.exports = {

	crop_image : async function(path,width,height,save_path) {
		const image = await Jimp.read(path); 
		image.crop(500,500,width, height, function(err){ 
		    if (err) throw err; 
		}) 
		.write(save_path);
		return save_path; 
	}
}