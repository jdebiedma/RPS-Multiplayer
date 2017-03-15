var config = {
  apiKey: "AIzaSyDxQqkGa3AKrcGmGVFalJe40g4hdzADf6w",
  authDomain: "coder-bay-views.firebaseapp.com",
  databaseURL: "https://coder-bay-views.firebaseio.com",
  storageBucket: "coder-bay-views.appspot.com"
};

firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();