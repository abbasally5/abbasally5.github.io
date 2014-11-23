var app = angular.module('MADNight', ['ngSanitize']);
/*
app.factory('quotes', [function() {
	var arr = [
		"The quick brown fox jumped over the lazy dog",
		"asdfasdfadsfadsf"
		];
	return arr;
}]);
*/
app.controller('typeCtrl', ['$scope', 
	function($scope) {

		var quotes = [
		"The quick brown fox jumped over the lazy dog",
		"asdfasdfasdfasdf",
		"Perfection is not attainable, but if we chase perfection " + 
		"we can catch excellence",
		"Someone is sitting in the shade today because "+ 
		"someone planted a tree a long time ago",
		"Abbas likes to type on his mechanical keyboard",
		"The pumpkin pie at kinsolving is not good",
		"Vinay likes to hookup with Shannon",
		"Daniel likes to wear vineyard vines sweaters and shirts",
		"Abbas wants to learn how to code in C++",
		"Repeating things over and over and over and over is really annoying",
		"I like typing!",
		"The rabbit likes to jump over the cabbages and head straight fo the carrot patch",
		"Putting chocolate sauce on top of ice cream is good",
		"George Farcasiu was not the team captain of the Team 3947",
		"Vinay wants a threesome with Leslie and Jackie",
		"Deepak's GTI is really fast",
		"I go to UT, the best University in the world!",
		"My favorite food is spaghetti",
		"My new best friend is League of Legends streams",
		"I like riding shotgun",
		"I like eating tortillas with cheese and guacamole",
		"The real problem with America is its availability of cheese",
		"I am glad I didn't go to UTD",
		"Jeffrey Smythe is our lord and savior",
		"Jeffrey is the reason for the season",
		"Jeffreys elbows move side to side",
		"Soda is bad for your health",
		"Everytime a chimpanzee eats a yogurt a cow dies",
		"My favorite character in Legend of Korra is Bolin",
		"The best superhero is Iron Man",
		"Audi R8's are the coolest cars ever made"
		];

		$scope.randomQuote = function() {
			var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
			//console.log(randomQuote);
			return randomQuote;
		}
//
		var currentQuote = $scope.randomQuote();
		var visited = [];

		$scope.nextQuote = function() {
			//console.log("clicked");			
			if (visited.length == quotes.length)
				visited = [];
			if (!(!$scope.typed || $scope.typed === null))
				document.getElementById('text').value = '';
			$scope.typed = '';
			currentQuote = $scope.randomQuote();
			if (contains(visited, currentQuote))
				$scope.nextQuote();
			$scope.highlightText(currentQuote);
		}

		$scope.highlightText = function() {
			var quote = currentQuote;
			//console.log("quote " + quote);
			var htmlString = "";
			if (!$scope.typed || $scope.typed === null) {
				htmlString = "<span>" + quote + "</span>";
			}
			else {
				var correct = stringCorrect($scope.typed, quote);
				var incorrect = stringIncorrect($scope.typed, quote);
				if (correct.length == quote.length) {
					visited.push(currentQuote);
					$scope.nextQuote();
					return;
				}
				if (correct.length != 0) {
					htmlString += "<span class=\"correct\" >" + 
								correct + "</span>";
				}
				if (incorrect.length != 0) {
					 htmlString += "<span class=\"incorrect\">" + incorrect  + "</span>"; 
				}
				if (correct.length != quote.length) {
						htmlString += "<span>" + quote.substring(correct.length) + "</span>";
				}
			}
			//console.log("html " + htmlString);
			return htmlString;
		}
	}]);

function stringCorrect(typed, text) {
	var correct = "";
	//var letTyped = typed.split("");
	//var textArr = text.split("");
	for(i = 0; i < typed.length; i++) {
		if (typed.charAt(i) == text.charAt(i)) {
			correct += typed.charAt(i) + "";
		}
		else return correct;
	}
	//console.log("correct " + correct);
	return correct;
}

function stringIncorrect(typed, text) {
	var correct = stringCorrect(typed, text);
	return typed.substring(correct.length, typed.length);
}

function contains(arr, value) {
	for (i = 0; i < arr.length; i++){
		if (arr[i] == value)
			return true;
	}
	return false;
}
