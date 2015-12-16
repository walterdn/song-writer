require('angular/angular');
var angular = window.angular;

var songApp = angular.module('songwriter', []);
songApp.controller('songwriterController', ['$scope', function($scope) {
	var keys = [
		{name: 'C Major', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B']},
		{name: 'C Sharp Major', notes: ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C']},
		{name: 'D Major', notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#']},
		{name: 'E Flat Major', notes: ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D']},
		{name: 'E Major', notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']},
		{name: 'F Major', notes: ['F', 'G', 'A', 'A#', 'C', 'D', 'E']},
		{name: 'F Sharp Major', notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F']},
		{name: 'G Major', notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#']},
		{name: 'G Sharp Major', notes: ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G']},
		{name: 'A Major', notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#']},
		{name: 'B Flat Major', notes: ['A#', 'C', 'D', 'D#', 'F', 'G', 'A']},
		{name: 'B Major', notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']}
	];

	$scope.chords = [
		{name: 'c maj', notes: ['C', 'E', 'G']},
		{name: 'c min', notes: ["C", "D#", "G"]},
		{name: 'c sharp maj', notes: ["C#", "F", "G#"]},
		{name: 'c sharp min', notes: ["C#", "E", "G#"]},
		{name: 'd maj', notes: ["D", "F#", "A"]},
		{name: 'd min', notes: ["D", "F", "A"]},
		{name: 'e flat maj', notes: ["D#", "G", "A#"]},
		{name: 'e flat min', notes: ["D#", "F#", "A#"]},
		{name: 'e maj', notes: ["E", "G#", "B"]},
		{name: 'e min', notes: ["E", "G", "B"]},
		{name: 'f maj', notes: ["F", "A", "C"]},
		{name: 'f min', notes: ["F", "G#", "C"]},
		{name: 'f sharp maj', notes: ["F#", "A#", "C#"]},
		{name: 'f sharp min', notes: ["F#", "A", "C#"]},
		{name: 'g maj', notes: ["G", "B", "D"]},
		{name: 'g min', notes: ["G", "A#", "D"]},
		{name: 'g sharp maj', notes: ["G#", "C", "D#"]},
		{name: 'g sharp min', notes: ["G#", "B", "D#"]},
		{name: 'a maj', notes: ["A", "C#", "E"]},
		{name: 'a min', notes: ["A", "C", "E"]},
		{name: 'b flat maj', notes: ["A#", "D", "F"]},
		{name: 'b flat min', notes: ["A#", "C#", "F"]},
		{name: 'b maj', notes: ["B", "D#", "F#"]},
		{name: 'b min', notes: ["B", "D", "F#"]}
	];

	$scope.inProgress = false;
	$scope.chosenChords = [];
	$scope.allowedKeys = [];
	$scope.allowedChords = [];
	$scope.allowedNotes = [];

	$scope.reset = function() {
		$scope.inProgress = false;
		$scope.chosenChords = [];
		$scope.allowedKeys = [];
		$scope.allowedChords = [];
		$scope.allowedNotes = [];

		$scope.initializeKeys();
	};
	
	$scope.addChord = function(chord) {
		$scope.inProgress = true;
		$scope.chosenChords.push(chord);
		filterKeys();
		filterNotes();
		filterChords();
	};

	$scope.initializeKeys = function() {
		$scope.allowedKeys = [];
		keys.forEach(function(key) {
			$scope.allowedKeys.push(key)
		});
	};

	function filterKeys() {
		var notesUsed = [];

		$scope.chosenChords.forEach(function(chord) {
			notesUsed.push(chord.notes);
		});

		notesUsed = [].concat.apply([], notesUsed); //flattens noteUsed array

		$scope.allowedKeys = [];
		keys.forEach(function(key) {
			if(isArrayContained(notesUsed, key.notes)) {
				$scope.allowedKeys.push(key);
			} 
		});
	}

	function filterNotes() {
		$scope.allowedNotes = [];
		$scope.allowedKeys.forEach(function(key) {
			key.notes.forEach(function(note) {
				if ($scope.allowedNotes.indexOf(note) == -1) $scope.allowedNotes.push(note);
			});
		});
		$scope.allowedNotes.sort();
	}

	function filterChords() {
		$scope.allowedChords = [];
		$scope.chords.forEach(function(chord) {
			if (isArrayContained(chord.notes, $scope.allowedNotes)) $scope.allowedChords.push(chord);
		});
	}

	function isArrayContained(inner, outer) {
		for(i=0; i<inner.length; i++) {
			if (outer.indexOf(inner[i]) == -1) return false;
		}
		return true;
	}


//end of main song app controller body
}]);