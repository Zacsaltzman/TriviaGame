// Institute Variables

var time = 30;
var intervalId = "";
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var arrayFinder = 0;


var question01 = {
	question: "What is the other name of Experiment 626?",
	answers: ["Lilo", "Stitch", "Pleakley", "Gantu"],
	values: ["incorrect", "correct", "incorrect", "incorrect"],
	correct: "Stitch"
};
var question02 = {
	question: "What are the names of Ursula's eels?",
	answers: ["Flotsam and Jetsam", "Romeo and Juliet", "Bonnie and Clyde", "Thelma and Louise"],
	values: ["correct", "incorrect", "incorrect", "incorrect"],
	correct: "Flotsam and Jetsam"
};
var question03 = {
	question: "Who is the fairest one of them all?",
	answers: ["Belle", "Ariel", "Cinderella", "Snow White"],
	values: ["incorrect", "incorrect", "incorrect", "correct"],
	correct: "Snow White"
};
var question04 = {
	question: "Who went from zero to hero?",
	answers: ["Aladdin", "John Smith", "Hercules", "Simba"],
	values: ["incorrect", "incorrect", "correct", "incorrect"],
	correct: "Hercules"
};
var question05 = {
	question: "Who is not a member of Woody's Roundup",
	answers: ["Buzz Lightyear", "Jessie", "Bullseye", "Stinky Pete"],
	values: ["correct", "incorrect", "incorrect", "incorrect"],
	correct: "Buzz Lightyear"
};

var questionsArray = [question01, question02, question03, question04, question05];

// Functions

	function start () {
		$(".content-div").empty();
		var startButton = $("<button>");
		startButton.text("Start");
		startButton.addClass("start");
		$(".content-div").append(startButton);
	};

	function run() {
      intervalId = setInterval(decrement, 1000);
    };

    function decrement() {
      time--;
      $(".timer-div").html("Time Remaining: " + time + " Seconds");
      if (time == 0) {
        stop();
        if (arrayFinder < questionsArray.length-1) {
	        unanswered++;
	        $(".question-div").html("Incorrect!");
	        solutionWrite(questionsArray[arrayFinder]);
	        arrayFinder++;
	        setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 3000);
      	}
      	else if (arrayFinder < questionsArray.length) {
      		unanswered++;
	        $(".question-div").html("Incorrect!");
	        solutionWrite(questionsArray[arrayFinder]);
	        arrayFinder++;
	        setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 3000);
      	}
      };
    };

    function stop() {
      clearInterval(intervalId);
    };

	function questionWrite (obj) {
		time = 30;
		$(".timer-div").empty();
		$(".timer-div").html("Time Remaining: " + time + " Seconds");
		$(".question-div").empty();
		$(".content-div").empty();
		run ();
		$(".question-div").html(obj.question);
		for (var i = 0; i < 4; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer");
			answerButton.text(obj.answers[i]);
			answerButton.attr("value", obj.values[i]);
			$(".content-div").append(answerButton);
			$(".content-div").append("<br>");
		};
	};

	function solutionWrite (obj) {
		$(".question-div").empty();
		$(".content-div").empty();
		$(".content-div").html("The correct answer was " + obj.correct);
	};

	function startWrite () {
		questionWrite(question01);
	};

	function answerSelect () {
		if ($(this).attr("value") == "correct") {
			stop();
			if (arrayFinder < questionsArray.length-1) {
				solutionWrite(questionsArray[arrayFinder]);
				$(".question-div").html("Correct!");
				correct++;
				arrayFinder++;
				setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 3000);
			}
			else if (arrayFinder < questionsArray.length) {
	      		correct++;
		        $(".question-div").html("Correct!");
		        solutionWrite(questionsArray[arrayFinder]);
		        arrayFinder++;
		        setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 3000);
      		}
		}
		else if ($(this).attr("value") == "incorrect") {
			stop();
			if (arrayFinder < questionsArray.length-1) {
				solutionWrite(questionsArray[arrayFinder]);
				$(".question-div").html("Incorrect!");
				incorrect++;
				arrayFinder++;
				setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 3000);
			}
			else if (arrayFinder < questionsArray.length) {
	      		incorrect++;
		        $(".question-div").html("Incorrect!");
		        solutionWrite(questionsArray[arrayFinder]);
		        arrayFinder++;
		        setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 3000);
      		}
		}
	};

	function endWrite () {
		$(".question-div").empty();
		$(".content-div").empty();
		$(".question-div").html("Here's how you did!");
		$(".content-div").html("<p> Correct: " + correct + "</p>" + "<p> Incorrect: " + incorrect + "</p>" + "<p> Unanswered: " + unanswered + "</p>");
		var resetButton = $("<button>");
		resetButton.addClass("reset");
		resetButton.text("Start Over?");
		$(".content-div").append(resetButton);
	}

	function resetClick () {
		arrayFinder = 0;
		incorrect = 0;
		correct = 0;
		unanswered = 0;
		startWrite();
	}

	$(document).on("click", ".start", startWrite);

	$(document).on("click", ".answer", answerSelect);

	$(document).on("click", ".reset", resetClick);
// Running Code

start();