var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg + ' from ' + socket.id);
  })

  socket.on('disconnect', function() {
    console.log('user disconnected');
  })
})

http.listen(process.env.PORT, function(){
  console.log('listening on *:' + process.env.PORT);
});