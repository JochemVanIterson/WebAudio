var context;
var AudioFileBuffer = null;

$('body').ready(function(){
  alert("loaded jquery");
})

window.addEventListener('load', init, false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  } catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
  loadAudioFile("sample.wav");
}

function loadAudioFile(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      AudioFileBuffer = buffer;
    }, onError());
  }
  request.send();
}

function onError(e){
	console.log(e);
}


function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0);                           // play the source now
                                             // note: on older systems, may have to use deprecated noteOn(time);
}

$(document).ready(function(){
	$('#startPlaying').click(function(){
		playSound(AudioFileBuffer);
	});
});
