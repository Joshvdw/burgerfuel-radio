// api.js
// export const stationId = "s178759";
// export const apiUrl = `https://streaming.radio.co/api/v1/stations/${stationId}/now_playing`;

// export async function fetchNowPlaying() {
//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     // Assuming the JSON returns a "track" object with title and artist
//     const track = data.track;
//     const title = track && track.title ? track.title : "No Song Playing";
//     const artist = track && track.artist ? track.artist : "Unknown Artist";
//     document.getElementById("song-title").textContent = title;
//     document.getElementById("artist-name").textContent = artist;
//   } catch (error) {
//     console.error("Error fetching now playing data:", error);
//   }
// }

// Your credentials and station ID
const partnerId = "6M0b8*A8"; // Your Partner ID
const partnerKey = "t*30HQdymm7L"; // Your Partner Key
const stationId = "s178759"; // Your Station ID

// The API URL for TuneIn AIR API
const apiUrl = `https://air.radiotime.com/Playing.ashx?partnerId=${partnerId}&partnerKey=${partnerKey}&id=${stationId}`;

export function fetchDataAndUpdateDOM() {
  const displayTitle = document.querySelector("#song-title");
  const displayArtist = document.querySelector("#artist-name");
  if (displayTitle && displayArtist) {
    // Fetch now playing data from your station
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the response includes the current song data
        const track = data.track;

        if (track) {
          const title = track.title || "No Song Playing";
          const artist = track.artist || "Unknown Artist";
          displayTitle.textContent = title;
          displayArtist.textContent = artist;
        } else {
          console.log("No track data available.");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } else {
    console.error("The required DOM elements are not found.");
  }
}
