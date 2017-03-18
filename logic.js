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

var selectionPhase = database.ref("/selectionPhase")
var selectionPhaseStartedRef = database.ref("/selectionPhase/status");

var selectionPhaseStarted = false;

var player1selection = database.ref("/players/player1/selection");
var player2selection = database.ref("/players/player2/selection");

var p1readyRef = database.ref("/selectionPhase/p1pick");
var p2readyRef = database.ref("/selectionPhase/p2pick");

var p1Ref = playersRef.child("player1");
var p2Ref = playersRef.child("player2");

var keyRef = database.ref("/keys");

var enteredRef = database.ref("/entered");


var playerCount = 0;

var entered = false;

var myPlayerKey;

var firstKey = "";
var secondKey = "";

var myWins;
var myLosses;

var iAmPlayer;

var began = false;

var opponentChosen = false;
var opponentWeapon;

var myPick;

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

iAmPlayer = 1;

var chooser = selectionPhase.set({

	status : false,

	});

}

else if (playerCount === 1) {

	//	THIS IS THE SYNTAX TO SET DATA. I DIDN'T MAKE IT UP, ITS JUST HOW IT GOES.
	//	Remember, p2Ref = playersRef.child("player2");

	iAmPlayer = 2;

	p2Ref.update({
  	"name": playerName

});



}


	

$("#waitingRoom").html("<h5 class='animate-flicker'>waiting for opponent...</h5><br><br>")
.append("<img id='loadingPic' src='https://2aih25gkk2pi65s8wfa8kzvi-wpengine.netdna-ssl.com/gmat/wp-content/plugins/magoosh-lazyload-comments-better-ui/assets/img/loading.gif'>");

$("#name-input").val("");

$("#joinButton").slideUp();
$("#firstInput").slideUp();

$("#titleText").html('<h2 id="titleText">multiplayer rps</h2>')





playersRef.on("value", function(snapshot) {

	
	if (playerCount === 2 && !began) {

	console.log("game begin!");



	$(".hiddenOne").removeClass("hiddenOne");
	$("#waitingRoom").html("");

	
	//THIS IS THE SYNTAX TO READ DATA. I DIDN'T MAKE IT UP, ITS JUST HOW IT GOES.

	playersRef.orderByChild("playerID").equalTo(1).on("child_added", function(snapshot) {
  	$("#player-1-name").html('<h2 class="panel-title" id="player-1-name">'+snapshot.val().name+'</h2>')
	});

	playersRef.orderByChild("playerID").equalTo(2).on("child_added", function(snapshot) {
  	$("#player-2-name").html('<h2 class="panel-title" id="player-2-name">'+snapshot.val().name+'</h2>')
	});

	began = true;


	if (iAmPlayer === 1) {

		$(".player1panel").addClass("glow");

	$("#buttonsHere").append('<button type="button" class="btn btn-primary ee" id="rock1" >Rock</button>')
	$("#buttonsHere").append('<button type="button" class="btn btn-primary ee" id="paper1">Paper</button>')
	$("#buttonsHere").append('<button type="button" class="btn btn-primary ee" id="scissors1">Scissors</button>')

	$("#rock1").on("click", function() {

		p1Ref.update({

  			"selection": "rock"

		});
		myPick = "rock"
		iPicked();
	})

	$("#paper1").on("click", function() {

		p1Ref.update({

  			"selection": "paper"

		});
		myPick = "paper"
		iPicked();
	})

	$("#scissors1").on("click", function() {

		p1Ref.update({

  			"selection": "scissors"

		});
		myPick = "scissors"
		iPicked();
	})

	

	p2readyRef.on("value", function(snapshot) {

		if (selectionPhaseStarted) {
	
				opponentChosen = true;
				opponentWeapon = snapshot.val();

			if (myPick) {

				console.log("reveal! p2 selection made: " + snapshot.val());

			}
		
		}

		p1readyRef.on("value", function(snapshot){

			if (opponentChosen) { 

					alert("you have chosen " + snapshot.val() + " and your opponent has chosen " + opponentWeapon);

			}


		});
		});

	

		
	}

	else if (iAmPlayer === 2) {

		$(".player2panel").addClass("glow");

	$("#buttonsHere").append('<button type="button" class="btn btn-primary ee" id="rock2" >Rock</button>')
	$("#buttonsHere").append('<button type="button" class="btn btn-primary ee" id="paper2">Paper</button>')
	$("#buttonsHere").append('<button type="button" class="btn btn-primary ee" id="scissors2">Scissors</button>')


	$("#rock2").on("click", function() {

		p2Ref.update({

  			"selection": "rock"

		});

		myPick = "rock"

		iPicked();
	})

	$("#paper2").on("click", function() {

		p2Ref.update({

  			"selection": "paper"

		});

		myPick = "paper"

		iPicked();
	})

	$("#scissors2").on("click", function() {

		p2Ref.update({

  			"selection": "scissors"

		});

		myPick = "scissors"

		iPicked();


	})

	

			p1readyRef.on("value", function(snapshot) {
	
			if (selectionPhaseStarted) {
				opponentChosen = true;
				opponentWeapon = snapshot.val();

			if (myPick) {

				console.log("reveal! p1 selection made: " + snapshot.val());

			}
		}	

		p2readyRef.on("value", function(snapshot){

			if (opponentChosen) { 

					alert("you have chosen " + snapshot.val() + " and your opponent has chosen " + opponentWeapon);

			}


		});

		});

	

	

	}





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



function iPicked() {






	$(".moo").slideUp();
	$("#waitingRoom").html("<h5 class='animate-flicker'>waiting for opponent's selection...</h5><br><br>");

	$("#weaponHolder").html("<img id='weaponImage' src='http://b.illbrown.com/rps/img/"+myPick+"_small.png' style='height: 100px ; width: auto'></img>");




	if (iAmPlayer === 1) {$("#weaponImage").addClass("floatLeft");
		//$("#weaponHolder").append("<img src = 'http://vignette3.wikia.nocookie.net/vsbattles/images/f/f6/Versus_sign.png/revision/latest?cb=20151025005710' style='height: 100px ; width: 100px'></img>")
	

	var chooser = selectionPhase.update({

	"status" : true,

	});

	selectionPhase.update({
  	"p1pick": myPick,
  
	});

	};

	if (iAmPlayer === 2) {$("#weaponImage").addClass("floatRight");

		//$("#weaponHolder").prepend("<img src = 'http://vignette3.wikia.nocookie.net/vsbattles/images/f/f6/Versus_sign.png/revision/latest?cb=20151025005710' style='height: 100px ; width: 100px'></img>")
	var chooser = selectionPhase.update({

	"status" : true,

	});

	selectionPhase.update({
  	"p2pick": myPick,
  	
	});



	};

selectionPhaseStartedRef.on("value", function(snapshot){

				if (snapshot.val() === true) {

				console.log("Selection Phase Started!");
				selectionPhaseStarted = true;

			}

			})
	



	

}

