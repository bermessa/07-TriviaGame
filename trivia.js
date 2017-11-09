//GLOBAL VARIABLES
//=================================

var questionsLibrary = [
    {
        q: "Which U.S state has the nickname: Land of 10,000 lakes?",
        a: ["Michigan", "Minnesota", "Florida", "Idaho"],
        correctA: "Minnesota",
},
    {
        q: "The avacado is a tree that is thought to have originated in what country?",
        a: ["United States", "Panama", "Mexico", "Costa Rica"],
        correctA: "Mexico",
},
    {
        q: "In what country would you find the temple complex Angkor Wat?",
        a: ["Cambodia", "Vietnam", "Indonesia", "Laos"],
        correctA: "Cambodia",
},
    {
        q: "What is the largest ocean on the planet?",
        a: ["Atlantic Ocean", "Indian Ocean", "Artic Ocean", "Pacific Ocean"],
        correctA: "Pacific Ocean",
},
    {
        q: "Which of the great lakes does not share a border with Canada?",
        a: ["Lake Superior", "Lake Huron", "Lake Michigan", "Lake Erie"],
        correctA: "Lake Michigan",
}];

var startScreen = "";
var secondsCounter = 10;
var theClock;
var counter = 0;
var correctGuess = 0;
var wrongGuess = 0;
var userChoice;

//FUNCTIONS
//=================================
$(document).ready(function() {

    function initialScreen() {
        startScreen = "<p class='text-center'><button type='button' class='btn btn-lg' id='startButton'>Start Game</button></p>";
        $(".panel").append(startScreen);
    }



    function showQuestion() {


        //resets
        secondsCounter = 10;
        $("#startButton").remove();
        $("#correctAnswer").empty();
        $("#answerDisplay").empty();
        $("#results").empty();

        //if there are no more questions, show results
        if (counter === questionsLibrary.length) {
            clearInterval(theClock);
            showResults();
        }
        else {
            //game actions
            questionTimer();
            $("#timer").show();
            $("#questionDisplay").show();
            $("#questionDisplay").text(questionsLibrary[counter].q);

            $("#answerDisplay").show();
            for (var i = 0; i < questionsLibrary[counter].a.length; i++) {
                $("#answerDisplay").append("<button type='button' class='btn btn-md' id='answerButton'>" + questionsLibrary[counter].a[i] + "</button>");
            }
        }
    }


    function questionTimer() {
        theClock = setInterval(tenSeconds, 1000);

        function tenSeconds() {
            if (secondsCounter <= 0) {
                clearInterval(theClock);
                showAnswer();
            }
            if (secondsCounter > 0) {
                secondsCounter--;
            }

            $("#timer").text("Time remaining: " + secondsCounter);
        }
    }



    function showAnswer() {

        //response to clicking answer choice button
        if (userChoice === questionsLibrary[counter].correctA) {
            clearInterval(theClock);
            $("#timer").hide();
            $("#questionDisplay").hide();
            $("#answerDisplay").hide();
            $("#correctAnswer").text("Great job, that's correct!");
            correctGuess++;
        }

        else {
            clearInterval(theClock);
            $("#timer").hide();
            $("#questionDisplay").hide();
            $("#answerDisplay").hide();
            $("#correctAnswer").text("The correct answer is: " + questionsLibrary[counter].correctA);
            wrongGuess++;
        }

        counter++;
        answerTimer();

        $("#timer").hide();
        $("#questionDisplay").hide();
        $("#answerDisplay").hide();
    }

    function answerTimer() {
        setTimeout(showQuestion, 3000);
    }


    function showResults() {
        $("#timer").hide();
        $("#questionDisplay").empty();

        $("#results").text("Score: " + correctGuess + " CORRECT and " + wrongGuess + " INCORRECT");
        $(".panel").append(startScreen);
        counter = 0;
        correctGuess = 0
        wrongGuess = 0

    }


    //MAIN PROCESS
    //=================================

    initialScreen();

    $(document).on("click", "#startButton", function() {
        showQuestion();
        console.log("hi");

    });

    $("#answerDisplay").on("click", "#answerButton", function() {
        userChoice = $(this).text();
        showAnswer();
    });


});
