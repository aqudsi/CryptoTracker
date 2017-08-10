  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDML1G1MMx20cM1-8CyORvXnFkVXL2-02U",
    authDomain: "sars-group-project-1.firebaseapp.com",
    databaseURL: "https://sars-group-project-1.firebaseio.com",
    projectId: "sars-group-project-1",
    storageBucket: "",
    messagingSenderId: "352517184103"
  };
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

var queryURL = "https://api.coinmarketcap.com/v1/ticker/?limit=10";



function ajaxCall() {
	console.log("Requesting data from API")

$.ajax({

	url: queryURL,
	method: "GET"

}).done(function(response) {

	console.log("AJAX request complete")
	
	for(var i=0;i<response.length;i++)
	{
		//gets BTC prices of all the cryptocurrencies in order of rank (limit of 10 currently) 
	 	var CCval = response[i].price_btc;
	 	//gets the percentage change over 24 hours of all the cryptocurrencies in order of rank (limit of 10 currently)
	 	var percentChange24hr = response[i].percent_change_24h;
	 	//gets the name of the cryptocurrency
	 	var CCname = response[i].name;
	 	//gets the symbol of the cryptocurrency
	 	var CCsymbol = response[i].symbol;
	 	console.log("Name: " + CCname + "(" + CCsymbol + ")");
		console.log("Current price: " + CCval);
		console.log("Percentage change over the last 24 hours: " + percentChange24hr +"%");

		database.ref().push({
		name: CCname,	
		value: CCval,
		percentChange24hr: percentChange24hr
	});

	}
});
}


function cryptoTracker(){




// var connectionsRef = database.ref("/connections");

// var connectedRef = database.ref(".info/connected");

// // When the client's connection state changes...
// connectedRef.on("value", function(snap) {

//   // If they are connected..
//   if (snap.val()) 
//   {
// 	// Add user to the connections list.
//     var con = connectionsRef.push(true);
//     console.log("Number of users: " + con);
//   }
//   //saves the last recorded bitcoin value for that user into a variable
//   // else if(!snap.val())
//   // {

//   // }	

// });

// // When first loaded or when the connections list changes...
// connectionsRef.on("value", function(snap) {

	   
// });



}
//gets information from the API when the web page is loaded
window.onload = function(){
	ajaxCall()
	setInterval(function(){ ajaxCall(); }, 6000);
}

//repeats the ajax call every 6 seconds

