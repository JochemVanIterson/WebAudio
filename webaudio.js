var context;

$(document).ready(function(){ // Init the audio context
  try { // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
    alert('Web Audio API loaded');
  } catch(e) {
    alert('Web Audio API is not supported in this browser');
  }

  walkingSound = new playfile(context, 'sample.wav');
  $('#startPlaying').click(function(){
		walkingSound.play();
	});

  $('#pausePlaying').click(function(){
		walkingSound.pause();
	});

  $('#stopPlaying').click(function(){
		walkingSound.stop();
	});
})
