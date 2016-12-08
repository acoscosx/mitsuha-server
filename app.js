const express = require('express');
const app = express();

const http = require('http').Server(app);

const io = require('socket.io')(http);

var fs = require('fs');
var multer = require('multer');
var bodyParser = require('body-parser');
var sharp = require('sharp');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(multer({
  dest: './public/images/'
}).single('photo'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/upload', function(req, res) {
  res.render('upload');
});

app.post('/upload', function(req, res) {
  var temp_path = req.file.path;
  var target_path = "public/images/" + req.file.originalname;
  var resized_path = "public/resized_images/" + req.file.originalname;

  console.log("temp: " + temp_path);
  console.log("target: " + target_path);
  console.log("reszied: " + resized_path);

  fs.rename(temp_path, target_path, function(err) {
    if (err) throw err;
    console.log('filename successfully changed');
  });

  sharp(target_path)
    .resize(300, 300)
    .toFile(resized_path, function(err) {
    // output.jpg is a 200 pixels wide and 200 pixels high image
    // containing a scaled and cropped version of input.jpg
    if (err) throw err;
    refresh()
  });
  res.render('upload');
});

io.sockets.on('connection', function(socket) {

  socket.on('client_ready', function() {
    console.log('NEW CLIENT');
    fs.readdir('./public/resized_images', function(err, files) {
      if (err) throw err;
      socket.emit('client_ready_back', files);
    });
  });

  socket.on('emit_from_uploader', function() {
    refresh()
  });

  socket.on('delete_img', function(target_src) {
    fs.unlink('public/' + target_src, function(err) {
      if (err) throw err;
      console.log(target_src + "を削除しました。");
      refresh()
    });
  });
});

const port = process.env.PORT|| 3000;
http.listen(port, function() {
  console.log("Server listening at localhost:" + port);
});

function refresh() {
  fs.readdir('./public/resized_images', function(err, files) {
    if (err) throw err;
    io.sockets.emit('refresh', files);
  });
}
