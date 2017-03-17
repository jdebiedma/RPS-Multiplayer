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

var keyRef = database.ref("/keys");

var enteredRef = database.ref("/entered");


var playerCount = 0;

var entered = false;

var myPlayerKey;

var firstKey = "";
var secondKey = "";

var myWins;
var myLosses;





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



$("#name-input").keyup(function(event){
    if(event.keyCode == 13){
        $("#joinButton").click();
    }
});

$("#joinButton").on("click", function(){

var playerName = $("#name-input").val();


playersRef.on("value", function (snap){

if (playerCount < 2) {	

var con = enteredRef.push({

name : playerName

});



con.onDisconnect().remove();

};


})	

if (playerCount < 2) {

if (playerCount === 0) {



playersRef.set({

		player1:	{

			name : playerName,
			wins: 0,
			losses: 0,
			playerID: 1,
			playerKey : "none" ,
			selection: "none"      		
      },

       player2:	    {

			name : playerName,
			wins: 0,
			losses: 0,
			playerID: 2,
			playerKey : "none" ,
			selection: "none"      		
      },

  }); 



}

else if (playerCount === 1) {

	var hopperRef = playersRef.child("player2");
	hopperRef.update({
  	"name": playerName
});



}




//adder.onDisconnect().remove();

// myPlayerKey = adder.key;

// console.log(myPlayerKey);

// if (playerCount === 1) {

// 		keyRef.child('firstKey').set(myPlayerKey);

// 	}

// if (playerCount === 2) {

// 		keyRef.child('secondKey').set(myPlayerKey);

// 	}


// keyRef.on("value", function(snap){

// //		console.log(snap.child("firstKey").val() + " and " + snap.child("secondKey").val());

// 		firstKey = snap.child("firstKey").val();
// 		secondKey = snap.child("secondKey").val();

// 	});
	

$("#waitingRoom").html("<h5 class='animate-flicker'>waiting for opponent...</h5><br><br>")
.append("<img id='loadingPic' src='https://2aih25gkk2pi65s8wfa8kzvi-wpengine.netdna-ssl.com/gmat/wp-content/plugins/magoosh-lazyload-comments-better-ui/assets/img/loading.gif'>");

$("#name-input").val("");

$("#joinButton").slideUp();
$("#firstInput").slideUp();

$("#titleText").html('<h2 id="titleText">multiplayer rps</h2>')


playersRef.orderByChild("playerID").equalTo(1).on("child_added", function(snapshot) {
  console.log("the first player's name is " + snapshot.val().name);
});

playersRef.orderByChild("playerID").equalTo(2).on("child_added", function(snapshot) {
  console.log("the second player's name is " + snapshot.val().name);




});








playersRef.on("value", function(snapshot) {

	
	if (playerCount === 2) {

	console.log("game begin!");



	$(".hiddenOne").removeClass("hiddenOne");
	$("#waitingRoom").remove();

	

	playersRef.orderByChild("playerID").equalTo(1).on("child_added", function(snapshot) {
  	$("#player-1-name").html('<h2 class="panel-title" id="player-1-name">'+snapshot.val().name+'</h2>')
	});

	playersRef.orderByChild("playerID").equalTo(2).on("child_added", function(snapshot) {
  	$("#player-2-name").html('<h2 class="panel-title" id="player-2-name">'+snapshot.val().name+'</h2>')
	});


	

}	

});


}



else {alert("Room is full!")};

});

enteredRef.on("value", function(snap) {

if (playerCount < 2) {

playerCount = snap.numChildren();

}

})





