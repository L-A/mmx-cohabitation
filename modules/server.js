var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cycle = require('./helpers').cycle;

var currentState = -1;
var scaleAuthorized = false;

app.get('/', function(req, res){
  res.sendFile(appRoot + "/pages/index.html");
});

app.get('/tout-puissant', function(req, res){
  res.sendFile(appRoot + "/pages/remote.html");
});

app.get('/media/crucifix.mov', function(req, res){
  res.sendFile(appRoot + "/media/crucifix.mov");
});

app.get('/media/mortier.mov', function(req, res){
  res.sendFile(appRoot + "/media/mortier.mov");
});

app.get('/media/exfoliant.mov', function(req, res){
  res.sendFile(appRoot + "/media/exfoliant.mov");
});

app.get('/media/grab-1.svg', function(req, res){
  res.sendFile(appRoot + "/media/grab-1.svg");
});

app.get('/media/grab-2.svg', function(req, res){
  res.sendFile(appRoot + "/media/grab-2.svg");
});

var rememberState = function (state) {
  currentState = state;
}

io.on('connection', function(socket){
  console.log('Client connecté');

  socket.on("setState", function(state) {
    rememberState(state);
    io.emit('state', state);
  });

  socket.on("toggleAuthorize", function() {
    scaleAuthorized = !scaleAuthorized;
    console.log("scale set to " + scaleAuthorized);
    io.emit('authorizationState', scaleAuthorized);
  });

  socket.emit('state', currentState);
  socket.emit('authorizationState', scaleAuthorized);
});

exports.askForState = function (state) {
  if ( currentState == -1 && scaleAuthorized) { // Must be authorized and not playing a video to trigger
    rememberState(state);
    exports.sendState(state);
  }
}

exports.sendState = function (state) {
  state = state || currentState;
  io.emit('state', state);
}

console.log(cycle);

http.listen(3000, function(){
  console.log('En écoute sur le port 3000');
});
