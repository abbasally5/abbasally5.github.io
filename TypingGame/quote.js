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
		"someone planted a tree a long time ago"
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
				htmlString = "<p>" + quote + "</p>";
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
	var letTyped = typed.split("");
	var textArr = text.split("");
	for(i = 0; i < letTyped.length; i++) {
		if (letTyped[i] == textArr[i]) {
			correct += letTyped[i];
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
