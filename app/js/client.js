require('angular/angular');
var angular = window.angular;
var sounds = require('./sounds');
var triads = sounds.triads;
var noteSounds = sounds.notes;

var songApp = angular.module('songwriter', ['ngDraggable']);
songApp.controller('songwriterController', ['$scope', function($scope) {
	var previewing = true;
	var keys = [
		{name: 'A Major', notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#']},
		{name: 'B Flat Major', notes: ['A#', 'C', 'D', 'D#', 'F', 'G', 'A']},
		{name: 'B Major', notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']},
		{name: 'C Major', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B']},
		{name: 'C Sharp Major', notes: ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C']},
		{name: 'D Major', notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#']},
		{name: 'E Flat Major', notes: ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D']},
		{name: 'E Major', notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']},
		{name: 'F Major', notes: ['F', 'G', 'A', 'A#', 'C', 'D', 'E']},
		{name: 'F Sharp Major', notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F']},
		{name: 'G Major', notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#']},
		{name: 'G Sharp Major', notes: ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G']}
	];

	var notes = [
		{name: 'A', audio: noteSounds.a},
		{name: 'A#', audio: noteSounds.ashrp},
		{name: 'B', audio: noteSounds.b},
		{name: 'C', audio: noteSounds.c},
		{name: 'C#', audio: noteSounds.cshrp},
		{name: 'D', audio: noteSounds.d},
		{name: 'D#', audio: noteSounds.dshrp},
		{name: 'E', audio: noteSounds.e},
		{name: 'F', audio: noteSounds.f},
		{name: 'F#', audio: noteSounds.fshrp},
		{name: 'G', audio: noteSounds.g},
		{name: 'G#', audio: noteSounds.gshrp}
	];

	$scope.chords = [
		{name: 'a maj', notes: ["A", "C#", "E"], audio: triads.amaj},
		{name: 'a min', notes: ["A", "C", "E"], audio: triads.amin},
		{name: 'b flat maj', notes: ["A#", "D", "F"], audio: triads.bflatmaj},
		{name: 'b flat min', notes: ["A#", "C#", "F"], audio: triads.bflatmin},
		{name: 'b maj', notes: ["B", "D#", "F#"], audio: triads.bmaj},
		{name: 'b min', notes: ["B", "D", "F#"], audio: triads.bmin},
		{name: 'c maj', notes: ['C', 'E', 'G'], audio: triads.cmaj},
		{name: 'c min', notes: ["C", "D#", "G"], audio: triads.cmin},
		{name: 'c sharp maj', notes: ["C#", "F", "G#"], audio: triads.csharpmaj},
		{name: 'c sharp min', notes: ["C#", "E", "G#"], audio: triads.csharpmin},
		{name: 'd maj', notes: ["D", "F#", "A"], audio: triads.dmaj},
		{name: 'd min', notes: ["D", "F", "A"], audio: triads.dmin},
		{name: 'e flat maj', notes: ["D#", "G", "A#"], audio: triads.eflatmaj},
		{name: 'e flat min', notes: ["D#", "F#", "A#"], audio: triads.eflatmin},
		{name: 'e maj', notes: ["E", "G#", "B"], audio: triads.emaj},
		{name: 'e min', notes: ["E", "G", "B"], audio: triads.emin},
		{name: 'f maj', notes: ["F", "A", "C"], audio: triads.fmaj},
		{name: 'f min', notes: ["F", "G#", "C"], audio: triads.fmin},
		{name: 'f sharp maj', notes: ["F#", "A#", "C#"], audio: triads.fsharpmaj},
		{name: 'f sharp min', notes: ["F#", "A", "C#"], audio: triads.fsharpmin},
		{name: 'g maj', notes: ["G", "B", "D"], audio: triads.gmaj},
		{name: 'g min', notes: ["G", "A#", "D"], audio: triads.gmin},
		{name: 'g sharp maj', notes: ["G#", "C", "D#"], audio: triads.gsharpmaj},
		{name: 'g sharp min', notes: ["G#", "B", "D#"], audio: triads.gsharpmin}
	];

	$scope.inProgress = false;
	$scope.allowedKeys = [];
	$scope.allowedNotes = [];
	$scope.allowedNotes2 = [];
	$scope.allowedChords = [];
	$scope.chosenChords = [];
	$scope.recordedNotes = [];
	var recording = false;

	var timeData = [];
	var noteData = [];
	var melody = [];

	$scope.playChord = function(chord) { //plays a single chord
		if (previewing) chord.audio.play(); 
	};

	$scope.playNote = function(note) { //plays a single note
		if (previewing) note.audio.play();
		if (recording) {
			var d = new Date();
			timeData.push(d);
			noteData.push(note);
			// $scope.recordedNotes.push(note);
			// angular.element('#'+note.name).css('color', 'gray');
		}
	}

	$scope.toggleRecording = function() {

		if (recording) recording = false;
		else recording = true;
	}

	function processRecording() {
		var noteTimes = [];
		for(i=1; i<timeData.length; i++) {
			noteTimes.push(timeData[i] - timeData[0]);
		}
		melody = [];
		for(i=0; i<noteTimes.length; i++) {
			melody.push(noteData[i]); 
			melody[melody.length-1].time = noteTimes[i];
			melody[melody.length-1].firstLetter = melody[melody.length-1].name.charAt(0);
		}
		for(i=0; i<melody.length; i++) {
			$scope.recordedNotes.push(melody[i]);
		}
		for(i=0; i<melody.length; i++) {
			var distance = (Math.floor(((melody[i].time)/4400)*1500)).toString() + 'px';
			angular.element('#' + melody[i].firstLetter + melody[i].time).css('left', distance);
			$scope.$apply();
		}
	}

	$scope.togglePreviewing = function() { //toggles previewing chord on click
		if (previewing) previewing = false;
		else previewing = true;
	};

	function playMelody(loops) {
		melody.forEach(function(note) {
			setTimeout(function() {
				note.audio.play();
			}, note.time);
		});
	}

	function playChords(loops) {
		for(i=0; i<loops; i++) {
			$scope.chosenChords.forEach(function(chord, index) {
				setTimeout(function() {
					chord.audio.play();
				}, index*1100 + (i*4400));
			});
		}
	}

	$scope.playSong = function() { //plays your chord progression + melody
		var loops = $('input[id="loopNumber"]').val();
		
		if (recording) {
			timeData = [];
			var d = new Date();
			timeData.push(d);
			setTimeout(function() {
				recording = false;
				processRecording();
			}, (loops * 4400));
		}

		

		playMelody(loops);
		playChords(loops);
	};

	$scope.assignClassName = function(string) { //if input is string 'g sharp min', returns string 'gmin'
		string = string.toLowerCase();
		var className = string.charAt(0); //this shortened string is used as a class name for coloring purposes
		if (string.indexOf('maj') != -1) className += 'maj';
		if (string.indexOf('min') != -1) className += 'min';
		return className;
	}

	$scope.swapPositions = function(index, chord) { //swap position of two chords when you drag a chord onto another chord
		if (chord.chosen) {
			var otherChord = $scope.chosenChords[index];
			var otherIndex = $scope.chosenChords.indexOf(chord);
			$scope.chosenChords[index] = chord;
			$scope.chosenChords[otherIndex] = otherChord;
		} else {
			$scope.addChord(chord);
		}
	}

	$scope.addNote = function(note) { //adds note to chosenNotes array
		$scope.recordedNotes.push(note);
	}

	$scope.removeNote = function(note) { //removes note from chosenNotes array
		var index = $scope.chosenNotes.indexOf(note);
		$scope.chosenNotes.splice(index, 1);
	}
	
	$scope.addChord = function(chord) { //adds chord to chosenChords array, re-renders avaible chords/notes
		$scope.inProgress = true;
		if ($scope.chosenChords.length < 4) {
			if (!chord.chosen) {
				chord.chosen = true;
				$scope.chosenChords.push(chord);
				filterKeys();
				filterNotes();
				filterChords();
			}
		}
	};

	$scope.removeChord = function(chord) { //removes chord from chosenChords, re-renders avaiable chords/notes
		chord.chosen = false;
		var index = $scope.chosenChords.indexOf(chord);
		$scope.chosenChords.splice(index, 1);
		filterKeys();
		filterNotes();
		filterChords();
		if ($scope.chosenChords.length == 0) $scope.inProgress = false;
	};

	function filterKeys() { //renders available keys based on chosenChords
		var notesUsed = []; //notes used in your chosen chords
		$scope.chosenChords.forEach(function(chord) {
			notesUsed.push(chord.notes);
		});
		notesUsed = [].concat.apply([], notesUsed); //flattens array
		$scope.allowedKeys = [];
		keys.forEach(function(key) {
			if (isArrayContained(notesUsed, key.notes)) {
				$scope.allowedKeys.push(key);
			} 
		});
	}

	function filterNotes() { //renders available notes based on chosenChords
		$scope.allowedNotes = [];
		$scope.allowedKeys.forEach(function(key) {
			key.notes.forEach(function(note) {
				if ($scope.allowedNotes.indexOf(note) == -1) $scope.allowedNotes.push(note);
			});
		});
		$scope.allowedNotes.sort();
		$scope.allowedNotes2 = [];
		notes.forEach(function(note) {
			if ($scope.allowedNotes.indexOf(note.name) != -1) $scope.allowedNotes2.push(note);
		});
	}

	function filterChords() { //renders available chords based on chosenChords
		$scope.allowedChords = [];
		$scope.chords.forEach(function(chord) {
			if (isArrayContained(chord.notes, $scope.allowedNotes)) {
				if ($scope.chosenChords.indexOf(chord) == -1) {
					chord.chosen = false;
					$scope.allowedChords.push(chord);
				} 
			}
		});
	}

	function isArrayContained(inner, outer) { //helper func for filter functions. checks if an array is entirely contained in another
		for(i=0; i<inner.length; i++) {
			if (outer.indexOf(inner[i]) == -1) return false;
		}
		return true;
	}

	$scope.reset = function() { //resets to initial state
		$scope.inProgress = false;
		$scope.allowedKeys = [];
		$scope.allowedNotes = [];
		$scope.allowedChords = [];
		$scope.chosenChords = [];

		$scope.initializeKeys();
	};

	$scope.initializeKeys = function() { //initial population of allowed keys
		$scope.allowedKeys = [];
		keys.forEach(function(key) {
			$scope.allowedKeys.push(key)
		});
	};


//end of main song app controller body
}]);