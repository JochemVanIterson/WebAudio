function playfile(context, url, load=true){
  var self = this;
  var AudioFileBuffer = null;
  var source = null;
  var currentPosition = 0;

  if(load){
    loadFile();
  }

  function loadFile(){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        AudioFileBuffer = buffer;
      }, function(e){
        console.log(e);
      });
    }
    request.send();
  }
  self.play = function(){
    console.log("Start playing");
    source = context.createBufferSource();          // creates a sound source
    source.buffer = AudioFileBuffer;                // tell the source which sound to play
    source.connect(context.destination);            // connect the source to the context's destination (the speakers)
    source.start(0, currentPosition);               // play the source now
                                                    // note: on older systems, may have to use deprecated noteOn(time);
  }
  self.pause = function(){
    source.stop(0);
  }
  self.stop = function(){
    source.stop(0);
    currentPosition = 0;
  }
}
