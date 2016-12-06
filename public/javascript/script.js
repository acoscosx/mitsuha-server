$(function() {
  var socket = io.connect();
  socket.on('emit_from_server', function(data) {
    console.log('OK!');
    $('#logs').append($('<li>').text(data));
  });
});
