$(function() {
  var socket = io.connect();
  $('#imgUpload').submit(function() {
    socket.emit('emit_from_uploader');
  });
});
