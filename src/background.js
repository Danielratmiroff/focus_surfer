import { playSound } from "./offscreen.js";

let countdownTimer;
let defaultCountdownSeconds = 2; // Set this to any default countdown time in seconds

// Combine all onmessage listeners into one
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "startTimer") {
    startCountdown(defaultCountdownSeconds);
  } else {
    startCountdown(request.timerValue || defaultCountdownSeconds);
  }
});

chrome.action.onClicked.addListener((tab) => {
  startCountdown(defaultCountdownSeconds);
});

chrome.runtime.onInstalled.addListener(() => {
  // Replace or update the existing code to create the context menu
  chrome.contextMenus.create({
    id: "openOptions",
    title: "Options",
    contexts: ["action"], // The context is set to 'action' so it appears when clicking the extension icon.
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openOptions") {
    // Open a new tab with the index.html file
    chrome.tabs.create({ url: "index.html" });
  }
});

function updateBadge(text) {
  chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });
  chrome.action.setBadgeTextColor({ color: "#FFFFFF" });
  chrome.action.setBadgeText({ text: text });
}

function startCountdown(seconds) {
  clearInterval(countdownTimer);
  let endTime = Date.now() + seconds * 1000;

  countdownTimer = setInterval(async () => {
    let secondsLeft = Math.round((endTime - Date.now()) / 1000);
    if (secondsLeft > 0) {
      updateBadge(secondsLeft.toString());
    } else if (secondsLeft === 0) {
      await playSound("notification.mp3");
      updateBadge("");
    } else {
      clearInterval(countdownTimer);
      updateBadge("");
    }
  }, 1000);
}
