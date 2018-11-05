function playfile(context, url, load=true){
  var self = this;
  self.AudioFileBuffer = null;
  self.source = null;

  self.startedAt = 0;
  self.pausedAt = 0;
  self.playing = false;

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
        self.AudioFileBuffer = buffer;
      }, function(e){
        console.log(e);
      });
    }
    request.send();
  }
  self.play = function(){
    console.log("Start playing");
    var offset = self.pausedAt;

    self.source = context.createBufferSource();          // creates a sound source
    self.source.buffer = self.AudioFileBuffer;           // tell the source which sound to play
    self.source.connect(context.destination);            // connect the source to the context's destination (the speakers)
    self.source.start(0, offset);                        // play the source now

    self.startedAt = context.currentTime - offset;
    self.pausedAt = 0;
    self.playing = true;
  }
  self.pause = function(){
    console.log("Pause playing");
    var elapsed = context.currentTime - self.startedAt;
    console.log("elapsed", elapsed);
    self.stop();
    self.pausedAt = elapsed;
  }
  self.stop = function(){
    console.log("Stop playing");
    if(self.source){
        self.source.disconnect();
        self.source.stop(0);
        self.source = null;
    }
    self.pausedAt = 0;
    self.startedAt = 0;
    self.playing = false;
  }
}
