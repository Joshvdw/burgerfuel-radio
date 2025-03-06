export function updateTrackInfo() {
  const stationId = "s9909bd65f"; // Replace with your actual station ID
  const trackNameElement = document.getElementById("song-title");

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