const express = require('express');
const app = express();

const http = require('http').Server(app);

const io = require('socket.io')(http);

var fs = require('fs');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/upload', function(req, res) {
  res.render('upload');
});

io.sockets.on('connection', function(socket) {
  socket.on('emit_from_uploader', function(data) {
    console.log(data);
    fs.readdir('./public/images', function(err, files) {
      if (err) throw err;
      io.sockets.emit('refresh', files);
    });
  });
});

const port = process.env.PORT|| 3000;
http.listen(port, function() {
  console.log("Server listening at localhost:" + port);
});
