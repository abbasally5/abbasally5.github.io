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
		"The fault, dear Brutus, is not in our stars, " +
		"But in ourselves, that we are underlings",
		"O, she doth teach the torches to burn bright",
		"Shall I compare thee to a summer's day? " + 
		"Thou art more lovely and more temperate",
		"Good night, good night! Parting is such sweet sorrow, " + 
		"that I shall say good night till it be morrow",
		"A fool thinks himself to be wise, but a wise man knows himself to be a fool",
		"And yet, by heaven, I think my love as rare " +
		"As any she belied with false compare",
		"He likes to type on his mechanical keyboard",
		"I like typing!",
		"The rabbit likes to jump over the cabbages and head straight fo the carrot patch",
		"Putting chocolate sauce on top of ice cream is good",
		"I go to UT, the best University in the world!",
		"My favorite food is blank",
		"Jeffrey is the reason for the season",
		"Jeffrey's elbows move side to side",
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
