var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var state = 0;

app.get('/', function(req, res){
  res.sendFile(appRoot + "/pages/index.html");
});

app.get('/media/test-video.mp4', function(req, res){
  res.sendFile(appRoot + "/media/test-video.mp4");
});

io.on('connection', function(socket){
  console.log('Présentation connectée!');
  io.emit('state', state++);
});

// To send the state:
io.emit('state', state++); // A number?

http.listen(3000, function(){
  console.log('listening on *:3000');
});
