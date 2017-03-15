var config = {
    apiKey: "AIzaSyATEStdadiSSANmtV92zN6g9g0jCBf6IE0",
    authDomain: "multiplayerrps-27692.firebaseapp.com",
    databaseURL: "https://multiplayerrps-27692.firebaseio.com",
    storageBucket: "multiplayerrps-27692.appspot.com",
    messagingSenderId: "983963381684"
};

firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

var currentUsers = 1;

connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

  	if (currentUsers < 2) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);



    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
	}
  }
});

connectionsRef.on("value", function(snap) {

	currentUsers = snap.numChildren();
	console.log(currentUsers);

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#viewerCount").html("viewers: " + snap.numChildren());
});

database.ref("/")