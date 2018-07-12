

require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var omdbApi = require('omdb-client');
var request = require("request");

var keys = require("./keys");

var command = process.argv[2];

if(command === "my-tweets"){

}

switch(command){
    case "my-tweets":
        getMyTweets();
        break;
    case "spotify-this-song":
        getSong();
        break;
    case "movie-this":
        getMovie();
        break;
    default:
        console.log("That's not a valid command");
        break;
}


function getMyTweets(){
    console.log("Getting my tweets...");

    var client = new Twitter(keys.twitter);

    var params = {screen_name: 'cnn'};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for(var i = 0; i < tweets.length; i++){
                console.log(tweets[i].text);
            }
            
        }
    });
}

function getSong(){
    var spotify = new Spotify(keys.spotify);
 
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        console.log(data.tracks.items[0]); 
    });
}


function getMovie(){

var URL = "http://www.omdbapi.com/?s=terminator&apikey=73104e7a";

    request(URL, function(err, response, body) {
      // parse the response body (string) to a JSON object
      var jsonData = JSON.parse(body);
      console.log("The title of the Movie :" +jsonData.Search[0].Title);
      console.log("The year of production :" +jsonData.Search[0].Year);
      console.log("The type of Movie :" +jsonData.Search[0].Type);

      // showData ends up being the string containing the show data we will print to the console
    //   var showData = [
    //     "Show: " + jsonData.name,
    //     "Genre(s): " + jsonData.genres.join(", "),
    //     "Rating: " + jsonData.rating.average,
    //     "Network: " + jsonData.network.name,
    //     "Summary: " + jsonData.summary
    //   ].join("\n\n");

      // Append showData and the divider to log.txt, print showData to the console
    //   fs.appendFile("log.txt", showData + divider, function(err) {
    //     if (err) throw err;
    //     console.log(showData);
    //   });
    });
    //var omdbclient = new omdbclient(keys.omdbclient);

    
  };



