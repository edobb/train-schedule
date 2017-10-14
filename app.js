
	var config = {
        apiKey: "AIzaSyAv7UKJw90_WyjUt1rztaAt0QzKy6oC5ao",
        authDomain: "bootcamp-projectdemo.firebaseapp.com",
        databaseURL: "https://bootcamp-projectdemo.firebaseio.com",
        projectId: "bootcamp-projectdemo",
        storageBucket: "bootcamp-projectdemo.appspot.com",
        messagingSenderId: "787306714013"
      };
     firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

 
    var trainName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";
    var nextArrival = "";
    var minutesAway = "";
    var currentTime = moment();


		$("#add-train-btn").on("click", function(event) {
        event.preventDefault();

        trainName = $('#train-name-input').val().trim();
  			destination  = $('#destination-input').val().trim();
        firstTrain  = $("#first-train-input").val().trim();
  			frequency = $('#frequency-input').val().trim();
        nextArrival = firstTrain;
        minutesAway = 0;
        


        database.ref('/trains').push({
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency,

        })


		});
  database.ref('/trains').on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    // Store everything into a variable.
    var trFirstTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    var trDiffTime = moment().diff(moment(trFirstTimeConverted), "minutes");
    var tRemainder = trDiffTime % childSnapshot.val().frequency;
    var trName = childSnapshot.val().name;
    var trDestination = childSnapshot.val().destination;
    var trStart = childSnapshot.val().firstTrain;
    var trFrequency = childSnapshot.val().frequency;
    var trMinutesAway = frequency - tRemainder;
    var nextTrain = moment().add(trMinutesAway, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm");
    // Train Info
    console.log(trName);
    console.log(trMinutesAway);
    console.log(trDestination);
    console.log(trStart);
    console.log(trFrequency);

      var tr = $('<tr>');
      
      if ( trMinutesAway < 0 ) {
        trMinutesAway = 60 - ( trMinutesAway * -1 ) ;
      }

      tr = tr.html('<td>' + trName + '</td><td>' + trDestination + '</td><td>' + trFrequency + '</td><td>' + nextTrainFormatted + '</td><td>' + trMinutesAway + '</td>' );


        var firstRowTds = $("table")
          .children()
          .eq(1)

          firstRowTds.append(tr);
});



