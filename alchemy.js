var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key:  API_KEY;
});
var current = [];
var finalEmotion = ""
var analyzedTweets = [];
var raw = [
  ["Hello, I'm joyful. Simply Just so happy!","90.78,80.55"],
  ["Hello, I'm fearful. Simply Just so sad!","90.78,80.55"],
  ["Hello, I'm joyful. Simply Just so happy!","90.78,80.55"],
  ["Hello, I'm fearful. Simply Just so sad!","90.78,80.55"],
  ["Hello, I'm joyful. Simply Just so happy!","90.78,80.55"],
  ["Hello, I'm fearful. Simply Just so sad!","90.78,80.55"]
];
function main(raw){
  tweets = createTweets(raw);
  for (n = 0; n < tweets.length; n+=1){
    var tweet = tweets[n]["txt"];
    var aEmotion = analyzeTweet(tweet);
    console.log("emo: "+aEmotion)
    var analyzedTweet = {
       txt: tweets[n][0],
       loc: tweets[n][1],
       emotion: aEmotion
    }
    analyzedTweets.push(analyzedTweet);
  }
}
//var rawData = ""
// //var emotions = []
// function analyzeTweet(tweet){
//   var retstring =  getFinalEmotion(tweet);
//   // console.log("RET:" + retstring);
// }
// function getFinalEmotion(tweet){
//   var parameters = {
//     text: tweet
//   }
//   alchemy_language.emotion(parameters, function (err, response) {
//     if (err){
//       console.log('error:', err);
//     } else {
//       var rawData = response;
//       var emotions = rawData['docEmotions'];
//       var mainEmotion=""
//       console.log(emotions)
//       console.log("CME: "+calcMaxEmo(emotions))
//       finalEmotion =  calcMaxEmo(emotions)
//     }
//   });
//   return finalEmotion;
// }
function calcMaxEmo(emotions){
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
  //console.log(mainEmotion)
  return mainEmotion;
}
function createTweets(raw){
  for (i = 0; i < raw.length; i+=1) {
    aTxt = raw[i][0];
    aLoc = raw[i][1];
    console.log(aTxt)
    console.log(aLoc)
    var newTweet = {
      txt: aTxt,
      loc: aLoc
    };
    current.push(newTweet);
  }
  for(var i=0;i<current.length;i+=1){
    console.log("current: "+current[i].txt+" "+current[i].loc)
  }
  return current;
}
main(raw);
