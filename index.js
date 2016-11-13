var express = require('express');
var Client = require('node-rest-client').Client;

var app = express();

function toEmioData(data) {
  return {
    "Text": "Taco!",
    "Location": {
      "Longitude": data[0],
      "Latitude" : data[1],
    },
    "Emotion" : data[2]
  }
}

app.get('/', function(request, response) {
  response.send('You must make a proper query!');
});

/**
 *  HTTP get /emotions
 */
app.get('/emotions', function(request, response) {
  response.send('This works!');
});

app.get('/emotions/area/:tags', function(request, response) {
  var tags = request.params.tags.split(',');
  if (tags.length == 4) {
    // Appropriate tag.
    // Handle Appropriately.
   j = toEmioData(tags)
   response.send(JSON.stringify(j));
  } else {
    response.send(404);
  }
});

app.get('/emotions/area/:tags/keyword/:keyword', function(request, response) {
  var tags = request.params.tags.split(',');
  if (tags.length == 4) {
   //Send keywords
   j = toEmioData(tags);
   response.send(JSON.stringify(j));
  } else {
    respond.send(404);
  }
});

app.get('/emotions/area/:tags/emotion/:emotion', function(request, response) {
  var tags = request.params.tags.split(',');
  if (tags.length == 4) {
   //Send keywords
   j = toEmioData(tags);
   j.emotion = request.params.emotion;
   response.send(JSON.stringify(j));
  } else {
    respond.send(404);
  }
});

app.get('/amadeus/origin/:origin/max_price/:max_price', function(request, response) {
  var client = new Client();
  var j;
  var apiKey = 'RvgLqBzb1H67WTUb4WQbKKQPgmk9SAlK';
  var reqstring = "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=" +
                  request.params.origin + "&max_price=" +
                  request.params.max_price + "&apikey=" +
                  apiKey;
  client.get(reqstring, function(data, res) {
    // console.log("Data: ");
    // console.log(data);
    response.send(data);
  });
});


app.listen(3000);
