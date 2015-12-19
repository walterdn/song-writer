require('angular/angular');
var BufferLoader = require('./buffer-loader');
var angular = window.angular;

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
	$scope.allowedKeys = [];
	$scope.allowedNotes = [];
	$scope.allowedChords = [];
	$scope.chosenChords = [];
	$scope.chosenNotes = [];

	$scope.recordedNotes = [];
	$scope.recording = false;

	var startTime;
	var timeData = [];
	var noteData = [];
	var melody = [];

	$scope.context; 
	$scope.bufferLoader;
	context = new AudioContext();

	$(document).keypress(function(e) {
		if (e.which == 97) $scope.playNote($scope.allowedNotes[0]);
		if (e.which == 115) $scope.playNote($scope.allowedNotes[1]);
		if (e.which == 100) $scope.playNote($scope.allowedNotes[2]);
		if (e.which == 102) $scope.playNote($scope.allowedNotes[3]);
		if (e.which == 103) $scope.playNote($scope.allowedNotes[4]);
		if (e.which == 104) $scope.playNote($scope.allowedNotes[5]);
		if (e.which == 106) $scope.playNote($scope.allowedNotes[6]);
		if (e.which == 107) $scope.playNote($scope.allowedNotes[7]);
		if (e.which == 108) $scope.playNote($scope.allowedNotes[8]);
		
		if (e.which == 32) $scope.playSong();
	});

	function removeSpaces (str){
		return str.replace(/\s/g, '').toLowerCase();
	};

	function changeName(str){
		//find a # in the name and replace it with shrp
		str = str.replace("#", "shrp").toLowerCase();
		return str;
	};

	$scope.finishedLoading = function(bufferList) {
    //Create source for audio context
    var sound = context.createBufferSource();
    sound.buffer = bufferList[0];
    sound.connect(context.destination);
  	//Play 
    sound.start(0);
	};

	$scope.playChord = function(chord){
		var name = removeSpaces(chord.name);
		console.log(name); 
		bufferLoader = new BufferLoader(
        context,
        [
        "chords/" + name + ".wav"
        ],
        $scope.finishedLoading
    );

    bufferLoader.load();
	}; 

	$scope.playNote = function(note){
	  if ($scope.recording) {
			melody.push({name: note, time: new Date()});
		}
		var name = changeName(note);	
		console.log(name); 
		if(previewing){
			bufferLoader = new BufferLoader(
	        context,
	        [
	        "notes/" + name + ".wav"
	        ],
	        $scope.finishedLoading
	    );

	    bufferLoader.load();
	  }
	};

	$scope.toggleRecording = function() {
		if ($scope.recording) $scope.recording = false;
		else $scope.recording = true;
	}

	function processRecording() {
		melody.forEach(function(note) {
			note.time = Math.round(note.time - startTime);
			note.id = note.name[0] + note.time;
			note.distance = parseFloat(note.time/44).toFixed(2).toString() + '%';
			$scope.recordedNotes.push(note);
		});
		$scope.$apply();

		// $scope.recordedNotes.forEach(function(note) {
		// 	var distance = parseFloat(note.time/44).toFixed(2).toString() + '%';
		// 	// alert(distance);
		// 	// $('#' + note.id).css('left', distance);
		// 	angular.element('#' + note.id).css('left', distance);
		// });

		// $scope.$apply();


		// for(i=0; i<melody.length; i++) {

		// 	// $scope.recordedNotes.push(melody[i]);
		// 	alert(melody[i]);
		// }
		// for(i=0; i<melody.length; i++) {
		// 	var distance = ((melody[i].time)/44).toString() + '%';
		// 	angular.element('#' + melody[i].name[0] + melody[i].time).css('left', distance);
		// 	$scope.$apply();
		// }
		// var distance2 = ((melody[0].time)/44).toString() + '%';
		// angular.element('#' + melody[0].name[0] + melody[0].time).css('left', distance2);
	}

	$scope.togglePreviewing = function() { //toggles previewing chord on click
		if (previewing) previewing = false;
		else previewing = true;
	};

	function playMelody(loops) {
		melody.forEach(function(note) {
			setTimeout(function() {
				$scope.playNote(note.name);
			}, note.time);
		});
	}

	function playChords(loops) {
		for(i=0; i<loops; i++) {
			$scope.chosenChords.forEach(function(chord, index) {
				setTimeout(function() {
					$scope.playChord(chord);
				}, index*1100 + (i*4400));
			});
		}
	}

	$scope.playSong = function() { //plays your chord progression + melody
		var loops = $('input[id="loopNumber"]').val();
		
		if ($scope.recording) {
			melody = [];
			startTime = new Date();
			setTimeout(function() {
				$scope.recording = false;
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
		$scope.chosenNotes.push(note);
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