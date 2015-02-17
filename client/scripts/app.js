// YOUR CODE HERE:
// var message = "This is a test. Of REST. The best."

// $.ajax({
//   // always use this url
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message');
//   }
// });

var pullMessages = function(){

  var messageIds = [];

  setInterval(function(){
    $.get ("https://api.parse.com/1/classes/chatterbox?order=-createdAt", function(data) {
      for (var i = data.results.length-1; i >= 0; i--){
        if (!_.contains( messageIds, data.results[i].objectId )){
          var msg = $("<div/>").text(data.results[i].text).html();
          var user = $("<div/>").text(data.results[i].username).html();
          $(".messages").prepend("<li>" + user + ": " + msg + data.results[i].createdAt + "</li>");

          messageIds.push(data.results[i].objectId);
        }
      }
    });
  }, 500);
};

pullMessages();

// $('.messages').append(message);
