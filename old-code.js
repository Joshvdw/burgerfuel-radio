document.addEventListener("DOMContentLoaded", function () {
  // Reference vinyl img
  const vinyl = document.getElementById("vinyl");
  let isInitialized = false; // Track if audio is initialized
  let audio_buffer; // Declare audio_buffer globally

  // Reference media
  var media = [
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/new_year_dubstep_minimix.mp3",
    ],
    fftSize = 1024,
    // [32, 64, 128, 256, 512, 1024, 2048]

    background_color = "rgba(0, 0, 1, 1)",
    background_gradient_color_1 = "#000011",
    background_gradient_color_2 = "#060D1F",
    background_gradient_color_3 = "#02243F",
    stars_color = "#465677",
    stars_color_2 = "#B5BFD4",
    stars_color_special = "#F451BA",
    TOTAL_STARS = 1500,
    STARS_BREAK_POINT = 140,
    stars = [],
    waveform_color = "rgba(29, 36, 57, 0.05)",
    waveform_color_2 = "rgba(0,0,0,0)",
    waveform_line_color = "rgba(157, 242, 157, 0.11)",
    waveform_line_color_2 = "rgba(157, 242, 157, 0.8)",
    waveform_tick = 0.05,
    TOTAL_POINTS = fftSize / 2,
    points = [],
    avg_circle,
    bubble_avg_color = "rgba(29, 36, 57, 0.1)",
    bubble_avg_color_2 = "rgba(29, 36, 57, 0.05)",
    bubble_avg_line_color = "rgba(77, 218, 248, 1)",
    bubble_avg_line_color_2 = "rgba(77, 218, 248, 1)",
    bubble_avg_tick = 0.001,
    TOTAL_AVG_POINTS = 64,
    AVG_BREAK_POINT = 100,
    avg_points = [],
    SHOW_STAR_FIELD = true,
    SHOW_WAVEFORM = true,
    SHOW_AVERAGE = true,
    AudioContext = window.AudioContext || window.webkitAudioContext,
    floor = Math.floor,
    round = Math.round,
    random = Math.random,
    sin = Math.sin,
    cos = Math.cos,
    PI = Math.PI,
    PI_TWO = PI * 2,
    PI_HALF = PI / 180,
    w = 0,
    h = 0,
    cx = 0,
    cy = 0,
    playing = false,
    startedAt,
    pausedAt,
    rotation = 0,
    msgElement = document.querySelector("#loading .msg"),
    avg,
    ctx,
    actx,
    asource,
    gainNode,
    analyser,
    frequencyData,
    frequencyDataLength,
    timeData;

  var loadingElement = document.querySelector("#loading");

  // Set vinyl size on initial page load
  function setVinylSize() {
    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;
    const initialRadius = Math.max(initialWidth, initialHeight) / 10; // Mimic avg_circle logic
    vinyl.style.width = initialRadius * 2.5 + "px";
    vinyl.style.height = initialRadius * 2.5 + "px";
  }

  // Call setVinylSize on page load
  setVinylSize();

  // Define Star class
  function Star() {
    var xc, yc;

    this.x = Math.random() * w - cx;
    this.y = Math.random() * h - cy;
    this.z = this.max_depth = Math.max(w / h);
    this.radius = 0.2;

    xc = this.x > 0 ? 1 : -1;
    yc = this.y > 0 ? 1 : -1;

    if (Math.abs(this.x) > Math.abs(this.y)) {
      this.dx = 1.0;
      this.dy = Math.abs(this.y / this.x);
    } else {
      this.dx = Math.abs(this.x / this.y);
      this.dy = 1.0;
    }

    this.dx *= xc;
    this.dy *= yc;
    this.dz = -0.1;

    this.ddx = 0.001 * this.dx;
    this.ddy = 0.001 * this.dy;

    if (this.y > cy / 2) {
      this.color = stars_color_2;
    } else {
      if (avg > AVG_BREAK_POINT + 10) {
        this.color = stars_color_2;
      } else if (avg > STARS_BREAK_POINT) {
        this.color = stars_color_special;
      } else {
        this.color = stars_color;
      }
    }

    xc = yc = null;
  }

  // Define createStarField function
  function createStarField() {
    var i = -1;

    while (++i < TOTAL_STARS) {
      stars.push(new Star());
    }

    i = null;
  }

  // Define Point class
  function Point(config) {
    this.index = config.index;
    this.angle = (this.index * 360) / TOTAL_POINTS;

    this.updateDynamics = function () {
      this.radius = Math.abs(w, h) / 10;
      this.x = cx + this.radius * sin(PI_HALF * this.angle);
      this.y = cy + this.radius * cos(PI_HALF * this.angle);
    };

    this.updateDynamics();

    this.value = Math.random() * 256;
    this.dx = this.x + this.value * sin(PI_HALF * this.angle);
    this.dy = this.y + this.value * cos(PI_HALF * this.angle);
  }

  // Define AvgCircle class
  function AvgCircle() {
    this.update = function () {
      this.radius = Math.abs(w, h) / 10;
    };

    this.update();
  }

  // Define createPoints function
  function createPoints() {
    var i;

    i = -1;
    while (++i < TOTAL_POINTS) {
      points.push(new Point({ index: i + 1 }));
    }

    avg_circle = new AvgCircle();

    i = null;
  }

  window.addEventListener("load", initialize, false);
  window.addEventListener("resize", resizeHandler, false);

  function initialize() {
    if (!AudioContext) return featureNotSupported();

    ctx = document.createElement("canvas").getContext("2d");
    actx = new AudioContext();
    document.body.appendChild(ctx.canvas);

    // Add click event listener to vinyl
    vinyl.addEventListener("click", function (e) {
      e.preventDefault();
      if (!isInitialized) {
        initializeAudio();
        isInitialized = true;
      } else {
        toggleAudio();
      }
      toggleVinylRotate();
    });

    resizeHandler();
  }

  function featureNotSupported() {
    return (document.getElementById("no-audio").style.display = "block");
  }

  function hideLoader() {
    return (loadingElement.className = "hide");
  }

  function updateLoadingMessage(text) {
    msgElement.textContent = text;
  }

  function initializeAudio() {
    asource = actx.createBufferSource();
    var xmlHTTP = new XMLHttpRequest();

    loadingElement.classList.add("show");
    updateLoadingMessage("- Loading Audio Buffer -");

    xmlHTTP.open("GET", media[0], true);
    xmlHTTP.responseType = "arraybuffer";

    xmlHTTP.onload = function (e) {
      updateLoadingMessage("- Decoding Audio File Data -");

      console.time("decoding audio data");
      actx.decodeAudioData(
        xmlHTTP.response,
        function (buffer) {
          console.timeEnd("decoding audio data");

          updateLoadingMessage("- Ready -");

          audio_buffer = buffer; // Initialize audio_buffer

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
          playAudio(); // Start playing after initialization
        },
        function (e) {
          alert("Error decoding audio data" + e);
        }
      );
    };

    xmlHTTP.send();

    // Start spinning vinyl
    vinyl.style.animationPlayState = "running";
  }

  function toggleAudio() {
    if (!audio_buffer) return; // Ensure audio_buffer is defined
    playing ? pauseAudio() : playAudio();
  }

  function toggleVinylRotate() {
    if (playing) {
      // Pause the animation and capture the current rotation
      const computedStyle = window.getComputedStyle(vinyl);
      const currentRotation =
        computedStyle.getPropertyValue("--rotation") || "0deg";
      vinyl.style.setProperty("--rotation", currentRotation);
      vinyl.style.animationPlayState = "paused";
    } else {
      // Resume the animation from the current rotation
      vinyl.style.animationPlayState = "running";
    }
  }

  function playAudio() {
    if (!audio_buffer) return; // Ensure audio_buffer is defined
    playing = true;
    startedAt = pausedAt ? Date.now() - pausedAt : Date.now();
    asource = null;
    asource = actx.createBufferSource();
    asource.buffer = audio_buffer;
    asource.loop = true;
    asource.connect(gainNode);
    pausedAt ? asource.start(0, pausedAt / 1000) : asource.start();

    animate();
  }

  function pauseAudio() {
    playing = false;
    pausedAt = Date.now() - startedAt;
    asource.stop();
  }

  function resizeHandler() {
    w = window.innerWidth;
    h = window.innerHeight;
    cx = w / 2;
    cy = h / 2;

    ctx.canvas.width = w;
    ctx.canvas.height = h;

    points.forEach(function (p) {
      p.updateDynamics();
    });

    if (avg_circle) {
      avg_circle.update();
    }
  }
});
