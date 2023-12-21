// src/background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "autofillForm") {
    // Your logic to autofill the login form
    console.log("Autofilling login form");
  }
});
