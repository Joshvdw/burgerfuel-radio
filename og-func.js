function initializeAudio() {
  asource = actx.createBufferSource();
  var xmlHTTP = new XMLHttpRequest();

  updateLoadingMessage("Loading...");

  xmlHTTP.open("GET", media[0], true);
  xmlHTTP.responseType = "arraybuffer";

  xmlHTTP.onload = function (e) {
    updateLoadingMessage("Connecting to Radio");

    actx.decodeAudioData(
      xmlHTTP.response,
      function (buffer) {
        audio_buffer = buffer;

        analyser = actx.createAnalyser();
        gainNode = actx.createGain();
        gainNode.gain.value = 1;

        analyser.fftSize = fftSize;
        analyser.minDecibels = -100;
        analyser.maxDecibels = -30;
        analyser.smoothingTimeConstant = 0.8;

        gainNode.connect(analyser);
        analyser.connect(actx.destination);

        frequencyDataLength = analyser.frequencyBinCount;
        frequencyData = new Uint8Array(frequencyDataLength);
        timeData = new Uint8Array(frequencyDataLength);

        createStarField();
        createPoints();
        hideLoader();
        showTextureOverlay();
        playAudio();

        // start spinning vinyl
        vinyl.style.animation = "rotateZ 10s linear infinite";
        vinyl.style.animationPlayState = "running";
      },
      function (e) {
        alert("Error decoding audio data" + e);
      }
    );
  };
  xmlHTTP.send();
}
