
var request = require("request");
require("dotenv").config();
// var Spotify = require("node-spotify-api");
var spotify = require('spotify');
var Twitter = require("twitter");
var omdbApi = require('omdb-client');
//var request = require("request");
var request = require('request');
var input1 = process.argv[2];
var input2 = process.argv[3];
var keys = require("./keys");
var fs = require("fs");



var getMyTweets = function () {
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitterKeys);
    var params = { screen_name: 'babatunde_bootcamp' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }
        console.log("twitter account issues");
    });
}


 
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify);

var getArtistNames = function(artist){
    return artist.name;
}

var spotifyThis = function(songName){
spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
//console.log(data.tracks.items[0]);
var songs = data.tracks.items; 
for(var i = 0; i<songs.length; i++){
    console.log(i);
    console.log("Artite:  "+ songs[i].artists.map(getArtistNames));
    console.log("song name  "+ songs[i].name);
    console.log("album: "+ songs[i].album.name);
    console.log("------------------------------------------------------------------------")
}
});
}


var mymovie = function(movieName){
request(' http://www.omdbapi.com/?s='+ movieName +'&apikey=73104e7a', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
  var jsonMovieData = JSON.parse(body);
  //console.log(jsonMovieData);
  for (var i = 0; i < jsonMovieData.Search.length; i++){
  console.log("Title:  "+ jsonMovieData.Search[i].Title);
  console.log("Year  "+ jsonMovieData.Search[i].Year);
  console.log("iIMDB Rated  "+ jsonMovieData.Search[i].imdbID);
  //console.log("IMDB Rating:  "+ jsonMovieData.Title);
  //console.log("Count:  "+ jsonMovieData.Title);
  }
});
}




  var executeAct = function(){
       fs.readFile('random.txt', 'utf8', function(err, data){
    if (err) throw err;
    //console.log(data);
            var info = data.split(",");
            if (info.length == 2){
            pick(info[0],info[1]);
            }
            else if(info.length ==1){
                pick(info[0]);
            }

  }); 

  }


var pick = function (caseData, FunctionData) {
    switch (caseData) {
        case "my-tweets":
            // console.log("twitter may not work");
            getMyTweets();
            break;
        case "my-spotify":
        spotifyThis(FunctionData);
            break;

        case "my-movie":
            mymovie(FunctionData);
            break;
        case "my-read":
            executeAct();
            break;
        default:
            console.log("nothing selected to execute!!!!")
    }
}

var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(input1, input2);