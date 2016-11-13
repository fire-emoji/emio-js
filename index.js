var express = require('express');
var Client = require('node-rest-client').Client;

var app = express();

app.set('port', (process.env.PORT || 5000));

function toEmioData(data) {
  return {
    "Text": "Taco!",
    "Location": {
      "Longitude": parseFloat(data[0]),
      "Latitude" : parseFloat(data[1]),
    },
    "Emotion" : data[2]
  }
}

function generateTestData(long1, lat1, long2, lat2, n) {
  testset = [];
  for (i = 0; i < n; i+=1) {
    var data = [];
    data.push(-1 * Math.floor((Math.random() * 125) + 119));
    data.push(Math.floor((Math.random() * 40) + 34));
    data.push(Math.floor(Math.random() * 5));
    testset.push(toEmioData(data));
  }
  return testset;
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
   j = toEmioData(tags);
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
    if (data.length > 10) {
      data.slice(0,10);
    }
    response.send(data);
  });
});

// DEBUG

app.get('/debug/area/:tags/:num', function(request, response) {
  var tags = request.params.tags.split(',');
  if (tags.length == 4) {
    // Appropriate tag.
    testset = generateTestData(tags[0], tags[1], tags[2], tags[3], request.params.num);
   response.send(JSON.stringify(testset));
  } else {
    response.send(404);
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
