var fs = require("fs");
var http = require("http");
var _config_ = require("./config");
var logs = _config_.LOGS;

// Start watching all files inf config.LOGS array...
for (var i = 0; i < logs.length; i++) {
   watchFile(logs[i]);
}



// Main functions  
function watchFile(logSet){
  var path = logSet.path;
  // get current file-size...
  var currSize = fs.statSync(path).size;
  console.log("["+new Date+"]"+ " Watching '"+path+"' ("+currSize+")");

  // now watch every x msec for file-size changes...
  setInterval(function(){
    var newSize = fs.statSync(path).size;
    if (newSize > currSize) {
      // additions were applied to file...
      readChanges(logSet, currSize, newSize);
      currSize = newSize;
    }   
    else {
      // deletions were applied to file
      if (newSize < currSize) {
        currSize = newSize;
      }
    }
  }, 1000);
}

function readChanges(logSet, from, to){
  var file = logSet.path
  var tag = logSet.tag
  var rstream = fs.createReadStream(file, {
    encoding: 'utf8',
    start: from,
    end: to
  });
  rstream.on('data', function(chunk) {
    data = chunk.trim();
    if (data !== '') {
      // make a http post
      postToBaywatch(tag,data);
    }
  }); 
}

function postToBaywatch(tag, data) {
  obj = {'line':data, 'system':tag};
  post_data = JSON.stringify(obj);
  console.log('sending: ' + post_data);
  
   // An object of options to indicate where to post to
   var post_options = {
       host: _config_.HOST,
       port: _config_.PORT,
       path: _config_.PATH,
       method: 'POST',
       headers: {
           'X-Auth-Token': _config_.AUTH_TOKEN,
           'Content-Type': 'application/json',
           'Content-Length': post_data.length
       }
   };

   // Set up the request
   var post_req = http.request(post_options, function(res) {
       res.setEncoding('utf8');
       res.on('data', function (chunk) {
           console.log('Response from Baywatch: ' + chunk);
       });
   });

   // post the data
   post_req.write(post_data);
   post_req.end();
}