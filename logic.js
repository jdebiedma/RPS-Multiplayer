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

var playersRef = database.ref("/players");

var playerCount = 0;

var entered = false;



connectionsRef.on("value", function(snap) {

	currentUsers = snap.numChildren();

	

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#viewerCount").html("viewers: " + snap.numChildren());
});

connectedRef.on("value", function(snap) {

  // If they are connected..


  if (snap.val()) {

    // Add user to the connections list.

    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

$("#joinButton").on("click", function(){

var playerName = $("#name-input").val();

if (playerCount < 2 && !entered) {

var adder = playersRef.push({

		
			name : playerName,
			wins: 0,
			losses: 0        
				
      });

adder.onDisconnect().remove();



$("#waitingRoom").html("<h5 class='animate-flicker'>waiting for opponent...</h5><br><br>")
.append("<img id='loadingPic' src='https://2aih25gkk2pi65s8wfa8kzvi-wpengine.netdna-ssl.com/gmat/wp-content/plugins/magoosh-lazyload-comments-better-ui/assets/img/loading.gif'>");

$("#name-input").val("");

$("#joinButton").slideUp();
$("#firstInput").slideUp();


entered = true;

}

else {alert("Room is full!")};

});

playersRef.on("value", function(snap) {

console.log(snap.numChildren());

playerCount = snap.numChildren();

})





