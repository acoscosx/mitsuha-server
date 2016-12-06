$(function() {
  var socket = io.connect();
  
  socket.on('refresh', function(files) {
    refreshImages(files);
  });

  function refreshImages(files) {
    $('.img-container').empty();
    for (var i = 0; i < files.length; i++) {
      var img_name = files[i];
      var img_path = "images/" + img_name;
      var inner_div = $('<div>').addClass('img-container');
      inner_div.append($('<img>').attr("src", img_path));
      $('#imgs').append(inner_div);
    }
  }
});
