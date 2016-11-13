var Twit = require('twit');

var fs = require ('fs');

var T;



function auth_setup()

{

  T = new Twit({

    consumer_key: 'HoOTtmR9Fb38te3fSfoVp8WAx',

    consumer_secret: 'A0XCKYvBnU9JoXqxQJSsh90kfYqamUA9YB3yUyJFQfbs7sLESu',

    access_token: '64691466-uatce40p59OjYvs69eZOizftD9terGiCmgvlbNxjf',

    access_token_secret: 'ACx8cAOf3mNhtj5rdZOivzGCj4OdarbY0i5X21KM4BjEc'

  })

}



function search(keyword, location, count, date)

{

  var params = {q: keyword, geocode: location, count: count, until: date};

  var tweeties = [];

  T.get('search/tweets', params, function(error, tweets, response)

  {

    tweeties = tweets.statuses;

    var tweet_txt = "Tweets.txt";

    var id_txt = "IDs.txt";

    var tweet_list = "[";

    var id_list = "[";



    //var keys = Object.keys(tweeties[0].screen_name);

    //for (k in keys)

    //{

      //console.log("Attribute: " + keys[k]);

    //}



    var visited_ids = fs.readFileSync(id_txt);

    var match = false;

    var flag = false;

    if (visited_ids != "")

    {

      var aux = (String(visited_ids)).split(",");

      visited_ids = aux;

      for (var j = 0; j < visited_ids.length; j++)

      {

        var aux = visited_ids[j].split("\"")[1];

        if (aux != null)

        {

          var aux2 = aux.split("\"")[0];

        }

        for (var i = 0; i < tweeties.length; i++)

        {

          if (aux2.localeCompare(tweeties[i].id) == 0)

          {

            match = true;

            break;

          }

        }

      }

    }

    if (!match)

    {

      for (var i = 0; i < tweeties.length; i++)

      {

        if (tweeties[i].geo != null)

        {

          flag = true;

          tweet_list += ("[\"" + tweeties[i].id + "\",\"" + tweeties[i].text + "\",\"" + tweeties[i].geo.coordinates + "\",\"" + tweeties[i].created_at + "\"]");

          id_list += "\"" + tweeties[i].id + "\",";

        }

        else

        {

          if (i == tweeties.length - 1)

          {

            id_list = id_list.substring(0, id_list.length - 1);

          }

        }

      }

    }

    tweet_list += "]\n";

    id_list += "]\n";

    if (flag)

    {

      fs.appendFileSync(tweet_txt, tweet_list);

      fs.appendFileSync(id_txt, id_list);

    }

  });

  var aux_date = date - 1;

  date = aux_date;

}



var keywords = ["Trump", "UFC", "McGregor", "Veteran", "USC", "Chappelle", "protest", "elections", "football", "basketball", "pizza", "burrito"];

var counter = 0;

var location = "37.781157,-122.398720,1mi";

var amount = 100;

var date = new Date();



auth_setup();

search(keywords[counter], location, amount, date);

counter++;

setInterval(function()

{

  if (counter >= keywords.length)

  {

    counter = 0;

  }

  search(keywords[counter], location, amount, date);

  counter++;

}, 5000);
