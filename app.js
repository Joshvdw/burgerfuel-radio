// PASTE THIS INTO SITE WIDE CODE
document.addEventListener("DOMContentLoaded", function () {
  // Check if mobile
  const isMobile = window.innerWidth <= 991;

  // Define media but ONLY preload on desktop
  const mediaStreamURL = "https://s3.radio.co/s9909bd65f/listen";
  let audioElement;

  // Preload for desktop (helps responsiveness)
  if (!isMobile) {
    audioElement = new Audio(mediaStreamURL);
    audioElement.crossOrigin = "anonymous";
    audioElement.preload = "auto";
  }

  /********** API CODE **********/
  function updateTrackInfo(id) {
    const stationId = "s9909bd65f"; // Replace with your actual station ID
    const trackNameElement = document.getElementById(id);

    // Fetch current track info from Radio.co API
    fetch(`https://public.radio.co/api/v2/${stationId}/track/current`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          trackNameElement.textContent = data.data.title;
        } else {
          console.error("Track info not available");
        }
      })
      .catch((error) => {
        console.error("Error fetching track info:", error);
      });
  }

  const currentPage = window.location.pathname;
  if (currentPage === "/radio") {
    // DON'T PASTE THIS INTO SITE WIDE CODE
    radioPageCode(updateTrackInfo, audioElement, isMobile, mediaStreamURL);
  } else {
    if (!isMobile) footerCode(updateTrackInfo, audioElement);
  }
});

function footerCode(updateTrackInfo, audioElement) {
  // update track into every 5s
  updateTrackInfo("footer-title");
  setInterval(() => updateTrackInfo("footer-title"), 5000);

  let isPlaying = false;
  const vinylFooter = document.querySelector("#vinyl-footer-rotator");

  document.querySelector("#footer-trigger").addEventListener("click", () => {
    if (!isPlaying) {
      audioElement
        .play()
        .then(() => {
          isPlaying = true;
          // Start spinning the vinyl
          vinylFooter.style.animation = "rotateZ 10s linear infinite";
          vinylFooter.style.animationPlayState = "running";
        })
        .catch((error) => {
          console.error("Error playing radio stream:", error);
        });
    } else {
      audioElement.pause();
      isPlaying = false;
      // Pause the vinyl rotation
      const computedStyle = window.getComputedStyle(vinylFooter);
      const currentRotation =
        computedStyle.getPropertyValue("--rotation") || "0deg";
      vinylFooter.style.setProperty("--rotation", currentRotation);
      vinylFooter.style.animationPlayState = "paused";
    }
  });
}

// PASTE THIS INTO RADIO PAGE ONLY
function radioPageCode(
  updateTrackInfo,
  audioElement,
  isMobile,
  mediaStreamURL
) {
  // Inject radio page specific CSS
  const style = document.createElement("style");
  style.textContent = `
 #bars {
  min-height: 28px;
  width: 30px;
  position: relative;
}
.bar {
  background: #773BAD;
  bottom: 0;
  height: 3px;
  position: absolute;
  width: 3px;
  animation: sound 0ms -800ms linear infinite alternate;
}
@keyframes sound {
  0% {
    height: 3px;
  }
  100% {
    height: 28px;
  }
}
.bar:nth-child(1) {
  left: 1px;
  animation-duration: 474ms;
}
.bar:nth-child(2) {
  left: 5px;
  animation-duration: 433ms;
}
.bar:nth-child(3) {
  left: 9px;
  animation-duration: 407ms;
}
.bar:nth-child(4) {
  left: 13px;
  animation-duration: 458ms;
}
.bar:nth-child(5) {
  left: 17px;
  animation-duration: 400ms;
}
.bar:nth-child(6) {
  left: 21px;
  animation-duration: 427ms;
}
.bar:nth-child(7) {
  left: 25px;
  animation-duration: 441ms;
}

.bounce-1 {
	animation: bounce 2s infinite;
	-webkit-animation: bounce 2s infinite;
	-moz-animation: bounce 2s infinite;
	-o-animation: bounce 2s infinite;
}

.bounce-2 {
	animation: bounce 2s infinite 200ms;
	-webkit-animation: bounce 2s infinite 200ms;
	-moz-animation: bounce 2s infinite 200ms;
	-o-animation: bounce 2s infinite 200ms;
}

.bounce-3 {
	animation: bounce 2s infinite 400ms;
	-webkit-animation: bounce 2s infinite 400ms;
	-moz-animation: bounce 2s infinite 400ms;
	-o-animation: bounce 2s infinite 400ms;
}
 
@-webkit-keyframes bounce {
	0%, 20%, 50%, 80%, 100% {-webkit-transform: translateY(0);}	
	40% {-webkit-transform: translateY(-20px);}
	60% {-webkit-transform: translateY(-7.5px);}
}
 
@-moz-keyframes bounce {
	0%, 20%, 50%, 80%, 100% {-moz-transform: translateY(0);}
	40% {-moz-transform: translateY(-20px);}
	60% {-moz-transform: translateY(-7.5px);}
}
 
@-o-keyframes bounce {
	0%, 20%, 50%, 80%, 100% {-o-transform: translateY(0);}
	40% {-o-transform: translateY(-20px);}
	60% {-o-transform: translateY(-7.5px);}
}
@keyframes bounce {
	0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
	40% {transform: translateY(-20px);}
	60% {transform: translateY(-7.5px);}
}
  `;
  document.head.appendChild(style);

  // update track into every 5s
  updateTrackInfo("song-title");
  setInterval(() => updateTrackInfo("song-title"), 5000);

  let isInitialized = false;
  const vinyl = document.querySelector(".vinyl_overlay-wrapper");
  const vinylText = document.querySelector("#vinylText");
  const playTextWrapper = document.querySelector("#playTextWrapper");
  const playPauseBottom = document.querySelector("#playPauseBottom");
  const playIcons = document.querySelectorAll(".play-icon");
  const pauseIcons = document.querySelectorAll(".pause-icon");
  const soundBars = document.querySelectorAll(".bar");

  // hide wrapper on launch
  hidePlayTextWrapper();
  // hide footer on radiopage
  hideRadioFooter();

  function hideRadioFooter() {
    const footer = document.querySelector("#footer-radio");
    footer.remove();
  }

  // CUSTOM MODAL FUNCTIONALITIES
  const thumbnails = document.querySelectorAll(".article-thumbnail_wrapper");
  const modals = document.querySelectorAll(".radio-article_modal");
  const musicSendBtn = document.querySelector("#musicSendBtn");
  const articleWrapper = document.querySelector("#articleWrapper");
  const musicSendMusicBlackCover = document.querySelector("#blackCover2");
  const articleBlackCover = document.querySelector("#blackCover");
  const closeSendMusicModalBtn = document.querySelector("#closeSendMusicModal");
  const loadingAnimation = document.querySelector("#loadingAnimation");
  const closeArticleModalsBtns = document.querySelectorAll(
    ".button.is-close.is-article"
  );

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      articleWrapper.style.zIndex = "6";
      // Get the parent article item of the clicked thumbnail
      const clickedArticleItem = thumbnail.closest(".radio-article_item");

      modals.forEach((modal) => {
        if (window.getComputedStyle(modal).display === "block") {
          // Get the parent article item of the open modal
          const modalArticleItem = modal.closest(".radio-article_item");
          // If the open modal is not in the same article item as the clicked thumbnail
          if (modalArticleItem !== clickedArticleItem) {
            // Find and click the reset button within the open modal
            const resetBtn = modalArticleItem.firstElementChild; // MAKE SURE RESET BTN IS THE FIRST ELEMENT CHILD OF THE MODAL ARTICLE ITEM
            resetBtn.click();
          }
        }
      });
    });
  });

  musicSendBtn.addEventListener("click", () => {
    articleWrapper.style.zIndex = "4";
  });

  musicSendMusicBlackCover.addEventListener("click", () => {
    closeSendMusicModalBtn.click();
  });

  articleBlackCover.addEventListener("click", () => {
    closeAllArticleModals();
  });

  // Add event listener for escape key to close the modal
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSendMusicModalBtn.click();
      closeAllArticleModals();
    }
  });

  function closeAllArticleModals() {
    closeArticleModalsBtns.forEach((resetBtn) => {
      resetBtn.click();
    });
  }

  // init sessions swiper
  function initSwiper() {
    // Get all radio-article_modal elements
    const articleModals = document.querySelectorAll(".radio-article_modal");

    // Check if there are any article modals
    if (articleModals.length === 0) {
      return;
    }

    // Get the last radio-article_modal in the NodeList
    const lastArticleModal = articleModals[articleModals.length - 1];

    // Find the swiper container within the last article modal
    const swiperContainer = lastArticleModal.querySelector(
      ".swiper.is-sessions:not(.w-condition-invisible)"
    );

    if (swiperContainer) {
      // Check if the parent modal is visible (not display: none)
      const parentDisplay = window.getComputedStyle(lastArticleModal).display;

      if (parentDisplay !== "none") {
        new Swiper(swiperContainer, {
          // spaceBetween: 180,
          loop: true,
          slidesPerView: 1.8,
          loopedSlides: 3,
          direction: "horizontal",
          centeredSlides: false,
          watchSlidesProgress: true,
          // preloadImages: true,
          // lazy: false,
          speed: 300,
          freeMode: true,
          freeModeMomentum: true,
          freeModeMomentumRatio: 0.4,

          navigation: {
            nextEl: ".sessions_slider-button.is-next",
            prevEl: ".sessions_slider-button.is-previous",
          },

          breakpoints: {
            767: {
              slidesPerView: 1.6,
              // spaceBetween: 120,
              speed: 300,
              freeMode: true,
              freeModeMomentum: true,
              freeModeMomentumRatio: 0.4,
            },
          },
        });
      } else {
        setTimeout(initSwiper, 500); // Retry every 500ms
      }
    }
  }
  // Initial check
  initSwiper();

  // copy email address to clipboard
  const emailBtn = document.querySelector("#emailBtn");
  const emailText = document.querySelector("#emailText");

  emailBtn.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("radio@burgerfuel.com");
    emailText.textContent = "Copied to clipboard!";
    setTimeout(() => {
      emailText.textContent = "Copy email address";
    }, 1500);
  });

  // Check if the device is iOS
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Remove purple overlay on ios to prevent bug
  if (isIOS) {
    const purpleOverlay = document.querySelector(".purple_overlay");
    if (purpleOverlay) {
      purpleOverlay.style.mixBlendMode = "overlay";
      purpleOverlay.style.opacity = "0.3";
    }
  }

  var media = [mediaStreamURL],
    fftSize = isMobile ? 128 : 512, // determines how many frequency bins are used to analyze the audio signal
    // [32, 64, 128, 256, 512, 1024, 2048] // use one of these lower values if running into performance issues

    background_color = "rgb(0, 0, 1)",
    background_gradient_color_1 = isIOS ? "#050011" : "#000011",
    background_gradient_color_2 = isIOS ? "#11061f" : "#060D1F",
    background_gradient_color_3 = isIOS ? "#592C83" : "#02243F",
    stars_color = isIOS ? "#685094" : "#465677",
    stars_color_2 = isIOS ? "#bba6e0" : "#B5BFD4",
    stars_color_special = isIOS ? "#c440de" : "#F451BA",
    TOTAL_STARS = isMobile ? 500 : 1500,
    STARS_BREAK_POINT = 140,
    stars = [],
    waveform_color = "rgba(29, 36, 57, 0.05)",
    waveform_color_2 = "rgba(0,0,0,0)",
    waveform_line_color = "rgba(157, 242, 157, 0.11)",
    waveform_line_color_2 = isIOS ? "#685094" : "rgba(157, 242, 157, 0.8)",
    waveform_tick = 0.05,
    TOTAL_POINTS = fftSize / 2,
    points = [],
    avg_circle,
    bubble_avg_color = "rgba(29, 36, 57, 0.1)",
    bubble_avg_color_2 = "rgba(29, 36, 57, 0.05)",
    bubble_avg_line_color = isIOS ? "#592C83" : "rgba(77, 218, 248, 1)",
    bubble_avg_line_color_2 = isIOS ? "#592C83" : "rgba(77, 218, 248, 1)",
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
    avg,
    ctx,
    actx,
    asource,
    gainNode,
    analyser,
    frequencyData,
    frequencyDataLength,
    timeData;

  const textureOverlay = document.querySelector(".texture_overlay");
  const loadingElement = document.querySelector("#loading");
  const msgElement = loadingElement.querySelector(".is-play");

  function updateVinylSize() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const initialRadius = Math.max(viewportWidth, viewportHeight) / 10;
    const multiplier = viewportWidth <= 767 ? 3.5 : 2.5; // Double the size for mobile
    vinyl.style.width = initialRadius * multiplier + "px";
    vinyl.style.height = initialRadius * multiplier + "px";
  }

  updateVinylSize();

  window.addEventListener("load", initialize, false);
  if (!isMobile) {
    window.addEventListener("resize", resizeHandler, false);
  }

  let isLoading = false;

  function initialize() {
    if (!AudioContext) return featureNotSupported();

    // create and add canvas to body
    const canvas = document.createElement("canvas");
    canvas.id = "visualizer-canvas";
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    // Add click event listener to vinyl
    vinyl.addEventListener("click", function (e) {
      if (isLoading) return;
      e.preventDefault();
      if (!isInitialized) {
        initializeAudio();
        isInitialized = true;
      } else {
        toggleAudio();
        toggleVinylRotate();
      }
    });
    resizeHandler();
  }

  function initializeAudio() {
    // Create AudioContext only when initializing audio (after user interaction)
    if (!actx) {
      actx = new (window.AudioContext || window.webkitAudioContext)();
    }
    isLoading = true;
    loadingAnimation.style.display = "flex";

    if (isMobile && !audioElement) {
      audioElement = new Audio(mediaStreamURL);
      audioElement.crossOrigin = "anonymous";
      audioElement.preload = "auto"; // Changed from 'none' to 'auto'
      audioElement.autoplay = false;
      audioElement.playsInline = true;
      audioElement.src = mediaStreamURL;
    }

    const track = actx.createMediaElementSource(audioElement);
    gainNode = actx.createGain();
    analyser = actx.createAnalyser();

    gainNode.gain.value = 1;
    analyser.fftSize = fftSize;
    analyser.minDecibels = -100;
    analyser.maxDecibels = -30;
    analyser.smoothingTimeConstant = 0.8;

    track.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(actx.destination);

    frequencyDataLength = analyser.frequencyBinCount;
    frequencyData = new Uint8Array(frequencyDataLength);
    timeData = new Uint8Array(frequencyDataLength);

    // Update loading message
    updateLoadingMessage("Loading...");
    setTimeout(flipLoadMessages, 1000);

    createStarField();
    createPoints();

    const handleReady = () => {
      setTimeout(() => {
        isLoading = false;
      }, 500);
      // Audio is ready to be played, hide loader and show texture overlay
      hideLoader();
      if (!isMobile) showTextureOverlay();
      showPlayTextWrapper();

      // Start spinning the vinyl
      vinylText.style.animation = "rotateZ 10s linear infinite";
      vinylText.style.animationPlayState = "running";

      // Now start playing the audio
      playAudio();
    };

    if (isMobile) {
      // Mobile: Use timeout fallback (3s) since canplaythrough is unreliable
      const mobileReadyTimeout = setTimeout(handleReady, 3000);
      // Still try canplaythrough in case it works
      audioElement.addEventListener("canplaythrough", () => {
        clearTimeout(mobileReadyTimeout);
        handleReady();
      });
    } else {
      audioElement.addEventListener("canplaythrough", handleReady);
    }
  }

  async function playAudio() {
    try {
      if (isMobile && !audioElement.src) {
        audioElement.src = mediaStreamURL;
      }

      // For iOS, pre-render canvas before starting audio
      if (isIOS) {
        prerenderCanvas();
      }

      // Critical for iOS: resume if suspended
      if (actx.state === "suspended") {
        await actx.resume();
      }

      playing = true;
      toggleIcons(true);
      await audioElement.play();
      animate();
    } catch (err) {
      console.error("Playback failed:", err);
    }
  }

  function pauseAudio() {
    playing = false;
    toggleIcons(false);
    audioElement.pause();
  }

  // add event listener to bottom icon
  playPauseBottom.addEventListener("click", function (e) {
    e.preventDefault();
    toggleAudio();
    toggleVinylRotate();
  });

  function featureNotSupported() {
    return (document.getElementById("no-audio").style.display = "block");
  }

  function hideLoader() {
    return document.querySelector(".loader_wrapper-outer").remove();
  }

  function showTextureOverlay() {
    textureOverlay.classList.add("show");
  }

  function updateLoadingMessage(text) {
    msgElement.textContent = text;
  }

  function flipLoadMessages() {
    const messages = ["...Flipping Burgers", "...Flipping Beats"];
    let index = 0;

    setInterval(() => {
      updateLoadingMessage(messages[index]);
      index = (index + 1) % messages.length;
    }, 1000);
  }

  function showPlayTextWrapper() {
    // Set initial styles
    playTextWrapper.style.display = "flex";
    playTextWrapper.style.transform = "translateX(-100%)";
    playTextWrapper.style.transition =
      "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    playTextWrapper.style.willChange = "transform"; // Optimize for animations

    // Force a reflow to ensure the initial state is rendered
    playTextWrapper.offsetHeight;

    // Trigger the slide-in
    requestAnimationFrame(() => {
      playTextWrapper.style.transform = "translateX(0)";
    });
  }

  function hidePlayTextWrapper() {
    playTextWrapper.style.display = "none";
  }

  function toggleIcons(isPlay) {
    if (isPlay) {
      playIcons.forEach((icon) => (icon.style.display = "none"));
      pauseIcons.forEach((icon) => (icon.style.display = "block"));
    } else {
      playIcons.forEach((icon) => (icon.style.display = "block"));
      pauseIcons.forEach((icon) => (icon.style.display = "none"));
    }
  }

  function toggleAudio() {
    playing ? pauseAudio() : playAudio();
  }

  function toggleVinylRotate() {
    if (!playing) {
      const computedStyle = window.getComputedStyle(vinyl);
      const currentRotation =
        computedStyle.getPropertyValue("--rotation") || "0deg";
      vinylText.style.setProperty("--rotation", currentRotation);
      vinylText.style.animationPlayState = "paused";
      soundBars.forEach((bar) => {
        bar.style.animationPlayState = "paused";
      });
    } else {
      vinylText.style.animationPlayState = "running";
      soundBars.forEach((bar) => {
        bar.style.animationPlayState = "running";
      });
    }
  }

  function getAvg(values) {
    var value = 0;

    values.forEach(function (v) {
      value += v;
    });

    return value / values.length;
  }

  function animate() {
    if (!playing) return;

    window.requestAnimationFrame(animate);

    // Get audio data (works on desktop/Android, returns zeros on iOS)
    analyser.getByteFrequencyData(frequencyData);
    analyser.getByteTimeDomainData(timeData);

    // Check if we're getting real data (non-iOS) or zeros (iOS)
    if (isIOS) {
      const sum = Array.from(frequencyData).reduce((a, b) => a + b, 0);
      if (sum === 0) {
        // On iOS, simulate audio data since we're getting zeros
        simulateAudioData();
      }
    }

    avg = getAvg([].slice.call(frequencyData)) * gainNode.gain.value;
    AVG_BREAK_POINT_HIT = avg > AVG_BREAK_POINT;

    clearCanvas();

    // Always show stars on all platforms
    if (SHOW_STAR_FIELD) {
      drawStarField();
    }

    // Only show average circle and waveform on non-iOS devices
    if (!isIOS) {
      if (SHOW_AVERAGE) {
        drawAverageCircle();
      }

      if (SHOW_WAVEFORM) {
        drawWaveform();
      }
    }
  }

  // Add a prerender function to ensure canvas is visible immediately on iOS
  function prerenderCanvas() {
    if (isIOS) {
      // Create initial data for stars
      simulateAudioData();

      // Set initial average value
      avg = getAvg([].slice.call(frequencyData)) * gainNode.gain.value;
      AVG_BREAK_POINT_HIT = avg > AVG_BREAK_POINT;

      // Perform an initial canvas render
      clearCanvas();
      drawStarField();
    }
  }

  // Simplify simulateAudioData for better performance, focusing only on stars
  function simulateAudioData() {
    const time = Date.now() / 1000;

    // Create a base value that oscillates over time for natural feel
    const baseLevel = 50 + Math.sin(time * 0.5) * 20; // Value between 30-70

    // Add some random variation to each update
    const randomVariation = Math.random() * 30;
    const level = baseLevel + randomVariation; // Between 30-100

    // Fill the frequency data array with simulated values - still needed for stars
    for (let i = 0; i < frequencyData.length; i++) {
      // Create a natural frequency distribution (lower frequencies are louder)
      const frequencyFactor = 1 - (i / frequencyData.length) * 0.8;
      // Add some randomness per frequency bin
      const binVariation = Math.random() * 20;
      // Combine factors for a natural-looking spectrum
      frequencyData[i] = Math.floor(level * frequencyFactor + binVariation);
    }

    // Since we're not showing waveform on iOS, we don't need to simulate detailed timeData
    // Just set it to default values
    for (let i = 0; i < timeData.length; i++) {
      timeData[i] = 128;
    }
  }

  function clearCanvas() {
    var gradient = ctx.createLinearGradient(0, 0, 0, h);

    gradient.addColorStop(0, background_gradient_color_1);
    gradient.addColorStop(0.96, background_gradient_color_2);
    gradient.addColorStop(1, background_gradient_color_3);

    ctx.beginPath();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    ctx.fill();
    ctx.closePath();

    gradient = null;
  }

  function drawStarField() {
    var i, len, p, tick;

    for (i = 0, len = stars.length; i < len; i++) {
      p = stars[i];
      tick = AVG_BREAK_POINT_HIT ? avg / 20 : avg / 50;
      p.x += p.dx * tick;
      p.y += p.dy * tick;
      p.z += p.dz;

      p.dx += p.ddx;
      p.dy += p.ddy;
      p.radius = 0.2 + (p.max_depth - p.z) * 0.1;

      if (p.x < -cx || p.x > cx || p.y < -cy || p.y > cy) {
        stars[i] = new Star();
        continue;
      }

      ctx.beginPath();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = p.color;
      ctx.arc(p.x + cx, p.y + cy, p.radius, PI_TWO, false);
      ctx.fill();
      ctx.closePath();
    }

    i = len = p = tick = null;
  }

  // Simplify drawAverageCircle function to remove iOS-specific code
  function drawAverageCircle() {
    if (AVG_BREAK_POINT_HIT) {
      ctx.strokeStyle = bubble_avg_line_color_2;
      ctx.fillStyle = bubble_avg_color_2;
    } else {
      ctx.strokeStyle = bubble_avg_line_color;
      ctx.fillStyle = bubble_avg_color;
    }

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(cx, cy, avg + avg_circle.radius, 0, PI_TWO, false);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  function drawWaveform() {
    var i,
      len,
      p,
      value,
      xc,
      yc,
      drawHorizontal,
      percent,
      height,
      offset,
      barWidth;

    if (AVG_BREAK_POINT_HIT) {
      rotation += waveform_tick;
      ctx.strokeStyle = waveform_line_color_2;
      ctx.fillStyle = waveform_color_2;
      drawHorizontal = true;
    } else {
      rotation += -waveform_tick;
      ctx.strokeStyle = waveform_line_color;
      ctx.fillStyle = waveform_color;
    }

    // Increase line width on iOS for better visibility
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.lineCap = "round";

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.translate(-cx, -cy);

    ctx.moveTo(points[0].dx, points[0].dy);

    for (i = 0, len = TOTAL_POINTS; i < len - 1; i++) {
      p = points[i];
      value = timeData[i];

      // Make waveform more pronounced on iOS
      if (isIOS) {
        value = Math.min(255, value * 1.5);
      }

      p.dx = p.x + value * sin(PI_HALF * p.angle);
      p.dy = p.y + value * cos(PI_HALF * p.angle);
      xc = (p.dx + points[i + 1].dx) / 2;
      yc = (p.dy + points[i + 1].dy) / 2;

      ctx.quadraticCurveTo(p.dx, p.dy, xc, yc);
    }

    value = timeData[i];
    // Make waveform more pronounced on iOS
    if (isIOS) {
      value = Math.min(255, value * 1.5);
    }

    p = points[i];
    p.dx = p.x + value * sin(PI_HALF * p.angle);
    p.dy = p.y + value * cos(PI_HALF * p.angle);
    xc = (p.dx + points[0].dx) / 2;
    yc = (p.dy + points[0].dy) / 2;

    ctx.quadraticCurveTo(p.dx, p.dy, xc, yc);
    ctx.quadraticCurveTo(xc, yc, points[0].dx, points[0].dy);

    ctx.stroke();
    ctx.fill();
    ctx.restore();
    ctx.closePath();

    if (drawHorizontal) {
      ctx.beginPath();

      for (i = 0, len = TOTAL_POINTS; i < len; i++) {
        value = timeData[i];
        percent = value / 256;
        height = h * percent;
        offset = h - height - 1;
        barWidth = w / TOTAL_POINTS;

        ctx.fillStyle = waveform_line_color_2;
        ctx.fillRect(i * barWidth, offset, 1, 1);
      }

      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    i =
      len =
      p =
      value =
      xc =
      yc =
      drawHorizontal =
      percent =
      height =
      offset =
      barWidth =
        null;
  }

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

  function createStarField() {
    var i = -1;

    while (++i < TOTAL_STARS) {
      stars.push(new Star());
    }

    i = null;
  }

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
  function AvgCircle() {
    this.update = function () {
      this.radius = Math.abs(w, h) / 10;
    };

    this.update();
  }

  function createPoints() {
    var i;

    i = -1;
    while (++i < TOTAL_POINTS) {
      points.push(new Point({ index: i + 1 }));
    }

    avg_circle = new AvgCircle();

    // Set vinyl img size
    if (vinyl && avg_circle) {
      updateVinylSize();
    }

    i = null;
  }

  function resizeHandler() {
    w = window.innerWidth;
    h = window.innerHeight;
    cx = w / 2;
    cy = h / 2;

    const canvas = document.getElementById("visualizer-canvas");
    if (canvas) {
      canvas.width = w;
      canvas.height = h;
    }

    points.forEach(function (p) {
      p.updateDynamics();
    });

    if (avg_circle) {
      avg_circle.update();
      updateVinylSize();
    }
  }
}
