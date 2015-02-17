$(function(){
// YOUR CODE HERE:
// var message = "This is a test. Of REST. The best."

// var postMessages = function() {
//   $.ajax({
//     // always use this url
//     url: 'https://api.parse.com/1/classes/chatterbox',
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('chatterbox: Message sent');
//     },
//     error: function (data) {
//       // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to send message');
//     }
//   });
// };

var app = {};
app.init = function(){};
app.send = function(message){
  var dataMessage = {
    username : window.location.search.slice(10),
    text : message,
    roomname : undefined
  };
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(dataMessage),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};
app.fetch = function(){

  var messageIds = [];
  var rooms = [];

  setInterval(function(){
    $.ajax({
        // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        for (var i = data.results.length-1; i >= 0; i--){
          if (!_.contains( messageIds, data.results[i].objectId )){
            var msg = $("<div/>").text(data.results[i].text).html();
            var user = $("<div/>").text(data.results[i].username).html();
            $(".messages").prepend("<li>" + "<span class='user'>" + user + "</span>" + ": " + "<span class='message'>" + msg + "</span>" + " room: " + data.results[i].roomname + "</li>");
            messageIds.push(data.results[i].objectId);

              if (!_.contains(rooms, data.results[i].roomname)){
                rooms.push(data.results[i].roomname);
                console.log(rooms);
                $("#roomList").empty();
              for (var j = 0; j < rooms.length; j++){
                  $("#roomList").append("<option>" + rooms[j] + "</option>");
              }
            }
          }
        }
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get messages.');
      }
    });
  }, 500);
};

app.fetch();

$('.submit-btn').on('click', function() {
  app.send($(".submission-input").val());
});

// $('.messages').append(message);
});
