var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cycle = require('./helpers').cycle;

app.get('/', function(req, res){
  res.sendFile(appRoot + "/pages/index.html");
});

app.get('/media/test-video.mp4', function(req, res){
  res.sendFile(appRoot + "/media/test-video.mp4");
});

app.get('/media/test-video-2.mp4', function(req, res){
  res.sendFile(appRoot + "/media/test-video-2.mp4");
});

io.on('connection', function(socket){
  console.log('Présentation connectée!');
  exports.sendState();
});

exports.sendState = function (state) {
  io.emit('state', state);
}

console.log(cycle);

http.listen(3000, function(){
  console.log('listening on port 3000');
});
