var watson = require('watson-developer-cloud');
var fs = require('fs');
var alchemy_language = watson.alchemy_language({
  api_key:  API_KEY
});
var current = [];
var finalEmotion = ""
var analyzedTweets = [];
var raw = [];

function handleTweetFile() {
  raw = fs.readFileSync('test_data_raw.txt', 'utf8');
  raw = JSON.parse(raw);
  // console.log(raw);
  tweets = createTweetsFile(raw);
  // console.log("TWEETS LENGTH" + tweets.length);
  for (n = 0; n < tweets.length; n+=1){
    var tweet = tweets[n]["txt"];
    var aEmotion = "";
    var parameters = {
      text: tweet
    }
    console.log("PROCESSING: " + parameters["text"]);
    var txt = tweets[n]["txt"];
    var loc = tweets[n]["loc"];
    console.log("TWEET::TEXT:: " + txt);
    alchemy_language.emotion(parameters, function (err, response) {
      if (err){
        console.log('error:', err);
      } else {
        var rawData = response;
        var emotions = rawData['docEmotions'];
        // console.log(emotions)
        aEmotion = emotions;

        aEmotion = calcMaxEmo(aEmotion, txt, loc);
      }
    });
  }
}

function handleTweet (raw) {
  tweets = createTweets(raw);
  for (n = 0; n < tweets.length; n+=1){
    var tweet = tweets[n]["txt"];
    var aEmotion = "";
    var parameters = {
      text: tweet
    }
    var txt = tweets[n]["txt"];
    var loc = tweets[n]["loc"];
    alchemy_language.emotion(parameters, function (err, response) {
      if (err){
        console.log('error:', err);
      } else {
        var rawData = response;
        var emotions = rawData['docEmotions'];
        console.log(emotions)
        aEmotion = emotions;

        aEmotion = calcMaxEmo(aEmotion, txt, loc);
      }
    });
  }
}

function calcMaxEmo(emotions, txt_, loc_){
  var mainEmotion = "";
  var max = 0;
  if (emotions["anger"] > max) {
    max = emotions["anger"];
    mainEmotion = "anger";
  }
  if (emotions["disgust"] > max) {
    max = emotions["disgust"];
    mainEmotion = "disgust";
  }
  if (emotions["fear"] > max) {
    max = emotions["fear"];
    mainEmotion = "fear";
  }
  if (emotions["joy"] > max) {
    max = emotions["joy"];
    mainEmotion = "joy";
  }
  if (emotions["sadness"] > max) {
    max = emotions["sadness"];
    mainEmotion = "sadness";
  }

  var analyzedTweet = {
    txt: txt_,
    loc: loc_,
    emotion: mainEmotion
  }

  console.log("ANALYZED: " + txt_ + "__" + analyzedTweet["emotion"]);
  analyzedTweets.push(analyzedTweet);
  fs.appendFileSync('test_data.txt', JSON.stringify(analyzedTweet));
}

function createTweets(raw){
  for (i = 0; i < raw.length; i+=1) {
    aTxt = raw[i][0];
    aLoc = raw[i][1];
    // console.log(aTxt)
    // console.log(aLoc)
    var newTweet = {
      txt: aTxt,
      loc: aLoc
    };
    current.push(newTweet);
  }
  for(var i=0;i<current.length;i+=1){
    // console.log("current: "+current[i].txt+" "+current[i].loc)
  }
  return current;
}

function createTweetsFile(raw){
  // console.log("RAW LENGTH: " + raw.length);
  for (i = 0; i < raw.length; i+=1) {
    aTxt = raw[i][1];
    aLoc = raw[i][2];
    // console.log(aTxt)
    // console.log(aLoc)
    var newTweet = {
      txt: aTxt,
      loc: aLoc
    };
    current.push(newTweet);
  }
  return current;
}

// handleTweet(raw);
handleTweetFile();
