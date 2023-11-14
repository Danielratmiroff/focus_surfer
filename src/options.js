document.getElementById("startTimer").addEventListener("click", () => {
  // Send a message to background.js to start the timer
  chrome.runtime.sendMessage({ action: "startTimer" });
});
