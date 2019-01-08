require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var fs = require("fs");


var command = process.argv[2]
var searchThis = [];
var arr = process.argv;

switch (command) {
    case "concert-this":
      concertThis();
      break;
    
    case "spotify-this-song":
      spotifyThis();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;

    default: 
    console.log('Command not recognized. Please use one of the following commands concert-this, spotify-this-song, movie-this or do-what-is-says')
    }
    
    


function spotifyThis() {
    var spotify = new Spotify(keys.spotify);
    var musicSearch = process.argv[3];
    
    spotify.search({ type: 'track', query: 'musicSearch', limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(typeof data); 
      console.log(data)
    })
}

        
function movieThis (){

    if (arr.length > 3) {
  for (var i = 3 ; i < arr.length; i++) {
    searchThis.push(arr[i]);
  }
}

var withSpace = searchThis.join('+');

console.log(searchThis);

var movie = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + withSpace + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

axios.get(queryUrl)
.then(function(res){
  console.log(typeof res.data);
  console.log(res.data)
})
};

function concertThis(){
    if (arr.length > 3) {
        for (var i = 3 ; i < arr.length; i++) {
          searchThis.push(arr[i]);
        }
      }
      
      var withSpace = searchThis.join('+');
      
      console.log(searchThis);
      
    var artist = process.argv[3]
    var queryUrl = "https://rest.bandsintown.com/artists/" + withSpace + "/events?app_id=codingbootcamp"
    axios.get(queryUrl)
.then(function(res){
  console.log(typeof res.data);
  console.log(res.data)
})
};

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(respError, data) {

        var arr = data.split(", ");

        if (arr[0] == "spotify-this-song") {
            spotifyThis(arr[1]);
        } else if (arr[0] == "movie-this") {
            movieThis(arr[1]);
        } else {
            concertThis(arr[1]);
        }
        });

    }
    
