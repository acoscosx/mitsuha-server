const express = require('express');
const app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

const port = process.env.PORT|| 3000;
http.listen(port, function() {
  console.log("Server listening at localhost:" + port);
});
