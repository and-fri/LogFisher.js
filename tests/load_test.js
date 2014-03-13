var http = require("http");
var _config_ = require("../config");
var i = 1;

setInterval(function(){
  loadBaywatch();
}, 100);

function loadBaywatch() {
  var msg = "Superawesome loadtest running --> (" + i +")";
  var obj = {'line':msg, 'system':'Log Fisher'};
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
   i++;
}
