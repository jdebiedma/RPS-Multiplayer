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

var myWins = 0;
var myLosses = 0;
var myTies = 0;

var x = 0;
var round = 0;
var prevRound = 0;

var thisRound = 3;
var thisPrevRound = 3;

var iAmPlayer;

var thisResult;

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



$("#name-input").keyup(function(event) {
    if (event.keyCode == 13) {
        $("#joinButton").click();
    }
});

$("#joinButton").on("click", function() {

    var playerName = $("#name-input").val();


    playersRef.on("value", function(snap) {

        if (playerCount < 2) {

            var con = enteredRef.push({

                name: playerName

            });



            con.onDisconnect().remove();

        };


    })

    if (playerCount < 2) {

        if (playerCount === 0) {



            playersRef.set({

                player1: {

                    name: playerName,
                    playerID: 1,
                    playerKey: "none",
                    selection: "none"
                },

                player2: {

                    name: playerName,
                    playerID: 2,
                    playerKey: "none",
                    selection: "none"
                },

            });

            iAmPlayer = 1;

            var chooser = selectionPhase.set({

                status: false,

            });

        } else if (playerCount === 1) {

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



    if (myWins === 0 && myLosses === 0 && myTies === 0) {

    	console.log("Round 1!")

    	round = 1;
    	prevRound = 1;

        playersRef.on("value", function(snapshot) {


            if (playerCount === 2 && !began) {

                console.log("game begin!");



                $(".hiddenOne").removeClass("hiddenOne");
                $("#waitingRoom").html("");


                //THIS IS THE SYNTAX TO READ DATA. I DIDN'T MAKE IT UP, ITS JUST HOW IT GOES.

                playersRef.orderByChild("playerID").equalTo(1).on("child_added", function(snapshot) {
                    $("#player-1-name").html('<h2 class="panel-title" id="player-1-name">' + snapshot.val().name + '</h2>')
                });

                playersRef.orderByChild("playerID").equalTo(2).on("child_added", function(snapshot) {
                    $("#player-2-name").html('<h2 class="panel-title" id="player-2-name">' + snapshot.val().name + '</h2>')
                });

                began = true;

                // Replace all this with nextTurn();



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


                } else if (iAmPlayer === 2) {

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



                }


               
                selectionPhaseStartedRef.on("value", function(snapshot) {
                

                    if (snapshot.val() === true) {

                        console.log("in selection phase");

                        if (iAmPlayer === 1 && round === prevRound) {

                            if (!selectionPhaseStarted && !myPick) {


                                console.log("your opponent has chosen his weapon.");

                            }



                            selectionPhase.on("value", function(snapshot) {

                                if (snapshot.val().p1pick && snapshot.val().p2pick && round === prevRound) {

                                    console.log("results: you chose " + snapshot.val().p1pick + " and your opponent chose " + snapshot.val().p2pick);

                                    $("#weaponHolder").append("<img id='opponentWeaponImage' src='http://b.illbrown.com/rps/img/" + snapshot.val().p2pick + "_small.png' style='height: 100px ; width: auto'></img>");

                                    $("#opponentWeaponImage").addClass("floatRight");

                                    console.log(snapshot.val().p1pick + " and  " + snapshot.val().p2pick);

                                    rpsResult(snapshot.val().p1pick, snapshot.val().p2pick);

                                    round ++;

                                }
                            })




                        };

                        if (iAmPlayer === 2 && round === prevRound) {

                            if (!selectionPhaseStarted && !myPick) {


                                console.log("your opponent has chosen his weapon.");

                            };




                            selectionPhase.on("value", function(snapshot) {

                                if (snapshot.val().p1pick && snapshot.val().p2pick && round === prevRound) {

                                    console.log("results: you chose " + snapshot.val().p2pick + " and your opponent chose " + snapshot.val().p1pick);


                                    $("#weaponHolder").prepend("<img id='opponentWeaponImage' src='http://b.illbrown.com/rps/img/" + snapshot.val().p1pick + "_small.png' style='height: 100px ; width: auto'></img>");

                                    $("#opponentWeaponImage").addClass("floatLeft");

                                    console.log(snapshot.val().p1pick + " and  " + snapshot.val().p2pick);

                                    rpsResult(snapshot.val().p1pick, snapshot.val().p2pick);

                                    round ++;

                                }
                            })




                        }

                    }

                    
                })
            

            }

        });

	}


    } 

    else {
        alert("Room is full! Refresh and try again.");
    };

});

enteredRef.on("value", function(snap) {

    if (playerCount < 2) {

        playerCount = snap.numChildren();

    }

})



function iPicked() {




    $(".ee").remove();
    $("#waitingRoom").html("<h5 class='animate-flicker'>waiting for opponent's selection...</h5><br><br>");

    $("#weaponHolder").html("<img id='weaponImage' src='http://b.illbrown.com/rps/img/" + myPick + "_small.png' style='height: 100px ; width: auto'></img>");




    if (iAmPlayer === 1) {
        $("#weaponImage").addClass("floatLeft");

        console.log("awake" + myTies + myWins + myLosses + myPick);
        var chooser = selectionPhase.update({

            "status": true,

        });

        selectionPhase.update({
            "p1pick": myPick,

        });

    };

    if (iAmPlayer === 2) {
        $("#weaponImage").addClass("floatRight");

        console.log("awake" + myTies + myWins + myLosses + myPick);

        var chooser = selectionPhase.update({

            "status": true,

        });

        selectionPhase.update({
            "p2pick": myPick,

        });



    };

    selectionPhase.once("value", function(snapshot) {

        if (snapshot.val().status === true) {

            console.log("Selection Phase Started!");
            selectionPhaseStarted = true;

        }

    })




}

function rpsResult(p1, p2) {

    //where you would pass in snapshot.val().p1pick as p1
    // and snapshot.val().p2pick as p2 to keep things clean

    $("#waitingRoom").html("")

    console.log("p1 is passed in as " + p1 + " and p2 is passed in as " + p2);

    if (p1 === "rock") {

        if (p2 === "rock") {
            thisResult = "tie"
        } else if (p2 === "paper") {
            thisResult = "p2win"
        } else if (p2 === "scissors") {
            thisResult = "p1win"
        }

    } else if (p1 === "paper") {

        if (p2 === "rock") {
            thisResult = "p1win"
        } else if (p2 === "paper") {
            thisResult = "tie"
        } else if (p2 === "scissors") {
            thisResult = "p2win"
        }

    } else if (p1 === "scissors") {

        if (p2 === "rock") {
            thisResult = "p2win"
        } else if (p2 === "paper") {
            thisResult = "p1win"
        } else if (p2 === "scissors") {
            thisResult = "tie"
        }

    };


    console.log(thisResult);

    

    if (iAmPlayer === 1 && thisResult === "p1win") {
        $(".selectionHolder1").html('<h2 class = "selectionHolder1 winnerClass animate-flicker">You Won!</h2>');
        x++;
        console.log("we went through here " + x + " times");
        myWins++;
    } else if (iAmPlayer === 1 && thisResult === "p2win") {
        $(".selectionHolder1").html('<h2 class = "selectionHolder1 loserClass">You Lost!</h2>');
        x++;
        console.log("we went through here " + x + " times");
        myLosses++;
    } else if (iAmPlayer === 1 && thisResult === "tie") {
        $(".selectionHolder1").html('<h2 class = "selectionHolder1">You Tied!</h2>');
        x++;
        console.log("we went through here " + x + " times");
        myTies++;
    } else if (iAmPlayer === 2 && thisResult === "p1win") {
        $(".selectionHolder2").html('<h2 class = "selectionHolder2 loserClass">You Lost!</h2>');
        x++;
        console.log("we went through here " + x + " times");
        myLosses++;
    } else if (iAmPlayer === 2 && thisResult === "p2win") {
        $(".selectionHolder2").html('<h2 class = "selectionHolder2 winnerClass animate-flicker">You Won!</h2>');
        x++;
        console.log("we went through here " + x + " times");
        myWins++;
    } else if (iAmPlayer === 2 && thisResult === "tie") {
        $(".selectionHolder2").html('<h2 class = "selectionHolder2">You Tied!</h2>');
        x++;
        console.log("we went through here " + x + " times");
        myTies++;
    }


    $("#scoreHolder").html('<h6 class = "scoreHolder">wins: ' + myWins + '</h6>')
        .append('<h6 class = "scoreHolder">losses: ' + myLosses + '</h6>');


    nextTurn();

}




function nextTurn() {


    myPick = false;
    began = false;

    console.log("Next round begin!");


    selectionPhase.update({

        "p1pick": false,

    });

    selectionPhase.update({

        "p2pick": false,

    });

    

    $(".selectionHolder1").html('<h3 class = "selectionHolder1"></h3>');

    $(".selectionHolder2").html('<h3 class = "selectionHolder2"></h3>');

    selectionPhaseStarted = false;


    //$("#happyCow").append('<div class="col-lg-4 col-lg-offset-4 moo" id = "buttonsHere">')

    $("#weaponHolder").html("");

    selectionPhase.update({
        "status": false,

    });



    $("#waitingRoom").html("");

    if (playerCount === 2 && !began) {

    console.log("next game begin!");

    began = true;

    playersRef.orderByChild("playerID").equalTo(1).on("child_added", function(snapshot) {
                    $("#player-1-name").html('<h2 class="panel-title" id="player-1-name">' + snapshot.val().name + '</h2>')
                });

                playersRef.orderByChild("playerID").equalTo(2).on("child_added", function(snapshot) {
                    $("#player-2-name").html('<h2 class="panel-title" id="player-2-name">' + snapshot.val().name + '</h2>')
                });



    if (iAmPlayer === 1) {

                    $(".player1panel").addClass("glow");

                    $("#buttonsHere").append('<button type="button" class="btn btn-primary ee" id="rock1" >Rock</button>')
                    $("#buttonsHere").append('<button type="button" class="btn btn-primary ee" id="paper1">Paper</button>')
                    $("#buttonsHere").append('<button type="button" class="btn btn-primary ee" id="scissors1">Scissors</button>');

                    $("#rock1").on("click", function() {

                        p1Ref.update({

                            "selection": "rock"

                        });
                        myPick = "rock"
                        iPickedNext();
                    })

                    $("#paper1").on("click", function() {

                        p1Ref.update({

                            "selection": "paper"

                        });
                        myPick = "paper"
                        iPickedNext();
                    })

                    $("#scissors1").on("click", function() {

                        p1Ref.update({

                            "selection": "scissors"

                        });
                        myPick = "scissors"
                        iPickedNext();
                    })


                } 

    else if (iAmPlayer === 2) {

                    $(".player2panel").addClass("glow");

                    $("#buttonsHere").append('<button type="button" class="btn btn-primary ee" id="rock2" >Rock</button>')
                    $("#buttonsHere").append('<button type="button" class="btn btn-primary ee" id="paper2">Paper</button>')
                    $("#buttonsHere").append('<button type="button" class="btn btn-primary ee" id="scissors2">Scissors</button>');


                    $("#rock2").on("click", function() {

                        p2Ref.update({

                            "selection": "rock"

                        });

                        myPick = "rock"

                        iPickedNext();
                    })

                    $("#paper2").on("click", function() {

                        p2Ref.update({

                            "selection": "paper"

                        });

                        myPick = "paper"

                        iPickedNext();
                    })

                    $("#scissors2").on("click", function() {

                        p2Ref.update({

                            "selection": "scissors"

                        });

                        myPick = "scissors"

                        iPickedNext();


                    })



                }


    			selectionPhaseStartedRef.on("value", function(snapshot) {


                    if (snapshot.val() === true) {

                        console.log("in selection phase");

                        if (iAmPlayer === 1 && thisRound === thisPrevRound) {

                            if (!selectionPhaseStarted && !myPick ) {


                                console.log("your opponent has chosen his weapon.");

                            }

                        	selectionPhase.on("value", function(snapshot) {

                                if (snapshot.val().p1pick && snapshot.val().p2pick && thisRound === thisPrevRound) {

                                    console.log("results: you chose " + snapshot.val().p1pick + " and your opponent chose " + snapshot.val().p2pick);

                                    $("#weaponHolder").append("<img id='opponentWeaponImage' src='http://b.illbrown.com/rps/img/" + snapshot.val().p2pick + "_small.png' style='height: 100px ; width: auto'></img>");

                                    $("#opponentWeaponImage").addClass("floatRight");

                                    console.log(snapshot.val().p1pick + " and  " + snapshot.val().p2pick);

                                    thisRound++;

                                    rpsResult(snapshot.val().p1pick, snapshot.val().p2pick);



                                }
                        	});


                            
                        }

                        if (iAmPlayer === 2 && thisRound === thisPrevRound) {

                       		if (!selectionPhaseStarted && !myPick) {


                                console.log("your opponent has chosen his weapon.");

                            }

                        	selectionPhase.on("value", function(snapshot) {

                                if (snapshot.val().p1pick && snapshot.val().p2pick && thisRound === thisPrevRound) {

                                    console.log("results: you chose " + snapshot.val().p2pick + " and your opponent chose " + snapshot.val().p1pick);

                                    $("#weaponHolder").prepend("<img id='opponentWeaponImage' src='http://b.illbrown.com/rps/img/" + snapshot.val().p2pick + "_small.png' style='height: 100px ; width: auto'></img>");

                                    $("#opponentWeaponImage").addClass("floatLeft");

                                    console.log(snapshot.val().p1pick + " and  " + snapshot.val().p2pick);

                                    thisRound++;

                                    rpsResult(snapshot.val().p1pick, snapshot.val().p2pick);

                                   

                                }
                        	});

                        }

                    }    	
            
                });    

    }

if (thisRound > thisPrevRound) {
thisPrevRound++;

};

}

function iPickedNext() {



	console.log("Next Round!");

	var chooser = selectionPhase.update({

            "status": true,

        });

	$(".ee").remove();
    $("#waitingRoom").html("<h5 class='animate-flicker'>waiting for opponent's selection...</h5><br><br>");

    $("#weaponHolder").html("<img id='weaponImage' src='http://b.illbrown.com/rps/img/" + myPick + "_small.png' style='height: 100px ; width: auto'></img>");

       if (iAmPlayer === 1) {
        $("#weaponImage").addClass("floatLeft");

        selectionPhase.update({
            "p1pick": myPick,

        });

    };

    if (iAmPlayer === 2) {
        $("#weaponImage").addClass("floatRight");

        selectionPhase.update({
            "p2pick": myPick,

        });



    };

}