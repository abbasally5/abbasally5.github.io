var app = angular.module('MADNight', ['ngSanitize']);

app.factory('typed', [function() {
	return '';
}]);

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
		"as any she belied with false compare",
		"He likes to type on his mechanical keyboard",
		"I like typing!",
		"The rabbit likes to jump over the cabbages and head straight for the carrot patch",
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
		var countPresses = 0;

		$scope.accuracy = function() {
			if (getCount() > 0) {
				var percent = stringCorrect($scope.typed, currentQuote).length/getCount();
				//console.log(percent);
				return (percent.toFixed(2) * 100) + "%";
			}
			else
				return getCount() + "%";			
		};

		$scope.WPM = function() {
			if (getCount() > 0) {
				var words = stringCorrect($scope.typed, currentQuote).length/5;
				var minutes = getMin();
				if (minutes == 0 || words == 0) return  0 ;
				return (words/minutes).toFixed(0) ;
			}
			else
				return 0 ;
		}

		$scope.netWPM = function() {
			if (getCount() > 0) {
				var minutes = getMin();				
				if (minutes == 0 ) 
					return 0;
				else {
					var errors = (stringIncorrect($scope.typed, currentQuote).length/minutes).toFixed(0);
					return ($scope.WPM() - errors);
				}
				
			}
			else
				return 0 ;
		}

		$scope.lineChartData = {
        	labels: [
        		timeArr[0], 
        		timeArr[1], 
        		timeArr[2]
      		],
      		datasets: [
        		{
          			data: [0, 5, 10, 15, 20, 25]
        		}
      		]
    	};
    
    	$scope.activeData = $scope.lineChartData;		

		$scope.nextQuote = function() {
			//console.log("clicked");			
			if (visited.length == quotes.length)
				visited = [];
			if (!(!$scope.typed || $scope.typed === null))
				document.getElementById('text').value = '';
			$scope.typed = '';
			setCount(0);
			currentQuote = $scope.randomQuote();
			if (contains(visited, currentQuote))
				$scope.nextQuote();
			document.getElementById('text').focus();
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
				//document.getElementById('stat1').innerText = countPresses;
				//console.log($scope.typed.length);
				//console.log("asdf " + $scope.typed.split(''));
				var correct = stringCorrect($scope.typed, quote);
				var incorrect = stringIncorrect($scope.typed, quote);
				if (correct.length == quote.length) {
					visited.push(currentQuote);
					swal({   
						title: "Good Job!",   
						text: "Accuracy:\t" + $scope.accuracy() + "\n" + 
							  "WPM:\t" + $scope.netWPM() + "\n" +
							  "Time:\t" + getMin(),   
						type: "success",   
						confirmButtonText: "Cool" 
					});
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
	if (typed === null) return correct;
	//var letTyped = typed.split("");
	//var textArr = text.split("");
	//console.log(typed.length);
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

//use for Accuracy and WPM
var counter = 0;

var startTime = 0;
var currTime = 0;

var dataArr = [];
var timeArr = [];

function getCount() {
	return counter;
}

function setCount(num) {
	counter = num;
}

function incrCount() {
	counter++;
	if (counter == 1) {
		startTime = new Date();
		//makeGraph();		
	}		
	currTime = new Date();
	//console.log(counter);
}

function getMin() {
	var minutes = (currTime.getTime() - startTime.getTime()) / 60000;
 	return minutes;
}

function getMinString() {
	var min = getMin();
	return ;
}