var image_process = require('./image_process.js');
var fs = require('fs');

// resize_class.js
function Resize(width,height,appDir) {
  this.width = width;
  this.height = height;
  this.appDir = appDir;
}
Resize.prototype.setOrginalFile = function(org_file) {        
  this.orginal_file = org_file;
  this.orginal_file_path = this.appDir+'/uploads/'+this.orginal_file;
}
Resize.prototype.setFunction = function(class_name) {        
    this.class_name = class_name;
};
Resize.prototype.getSavePath = function() {        
    path = '';
    if(this.class_name=='crop')
    	path = this.appDir+'/cache/crop/'+this.orginal_file+'-'+this.width+'-'+this.height+'.png';
    else if(this.class_name=='resize')
    	path = this.appDir+'/cache/resize/'+this.orginal_file+'-'+this.width+'-'+this.height+'.png';
    this.save_path = path;
    return path;
};

Resize.prototype.ifexsits1 = function() {        
  this.ifexsits = fs.existsSync(this.save_path);
};
Resize.prototype.ImageProcess = async function() {
	if(!this.ifexsits){
		try{
		this.file = await image_process[this.class_name](this.orginal_file_path,this.width,this.height,this.save_path);
		}
		catch(e){
			console.log(e);
		}
	}
	else
		this.file = this.save_path;
	return this.file;

};
Resize.prototype.getImage = async function() {
    file = await fs.readFile(this.file, function(err, data) {
            if (err) throw err; // Fail if the file can't be read.
            else {
              return data; // Send the file data to the browser.
            }
          });
};

module.exports = Resize;
