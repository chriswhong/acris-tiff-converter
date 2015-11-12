var ConvertTiff = require('tiff-to-png'),
request = require('request'),
Mustache = require('mustache'),
fs = require('fs');
 
//require('request').debug=true;
var tOptions = {
  logLevel: 1
};

var doc_id = '2011092200927001'

var template = 'http://a836-acris.nyc.gov/DS/DocumentSearch/GetImage?doc_id={{doc_id}}&page={{page}}';


var url = Mustache.render(template,{doc_id: doc_id,page:'1'});
 

var options = {
  url: url,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36' //pretend to be a broswer
  }
};

var tempPath = 'temp/' + doc_id + '.tif';
request(options).pipe(fs.createWriteStream(tempPath)).on('close', function(){
   convertToPng(tempPath);
});;
 

function convertToPng(path) {
  var converter = new ConvertTiff(tOptions);
 
var tiffs = [path];
var location = 'output';
 
converter.convertArray(tiffs, location);
}

