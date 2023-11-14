/********************************************
 * Listeners
 * *****************************************/
chrome.runtime.onMessage.addListener((msg) => {
  if ("play" in msg) playAudio(msg.play);
});

/********************************************
 * Functions
 ********************************************/
/**
 * Trigger audio playback from the service worker
 */
export async function playSound(source, volume = 1) {
  await createOffscreen();
  await chrome.runtime.sendMessage({ play: { source, volume } });
}

/**
 * Creates an offscreen document
 * Required to access DOM APIs from the service worker
 * @returns {Promise<void>}
 */
async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) {
    console.log("Offscreen document already exists");
    return;
  }
  console.log("Creating offscreen document");
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["AUDIO_PLAYBACK"],
    justification: "play sounds from the background",
  });
}

/**
 * Plays audio files from extension service workers
 * @param {string} source - path of the audio file
 * @param {number} volume - volume of the playback
 */
function playAudio({ source, volume }) {
  const audio = new Audio(`sounds/${source}`);
  audio.volume = volume;
  audio.play();
}
