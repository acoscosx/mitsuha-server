$(function() {
  var socket = io.connect();

  socket.emit('client_ready');

  socket.on('client_ready_back', function(files) {
    for (var i = 0; i < files.length; i++) {
      var img_name = files[i];
      var img_path = "images/" + img_name;
      var inner_div = $('<div>').addClass('pin');
      inner_div.append($('<img>').attr("src", img_path));
      $('#columns').append(inner_div);
    }
  });

  socket.on('refresh', function(files) {
    refreshImages(files);
  });

  function refreshImages(files) {
    $('#columns').empty();
    for (var i = 0; i < files.length; i++) {
      var img_name = files[i];
      var img_path = "images/" + img_name;
      var inner_div = $('<div>').addClass('pin');
      inner_div.append($('<img>').attr("src", img_path));
      $('#columns').append(inner_div);
    }
  }

  $(document).click(function(e) {
    var target_src = $(e.target).attr('src');
    if (target_src) {
      if (window.confirm('本当に削除しますか？')) {
        socket.emit('delete_img', target_src);
      }
    }
  });
});
