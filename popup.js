
let total_blocked_element = document.getElementById("blocked_count");


//Cant use local storage for this, going to have to use something else
//total_blocked_element.textContent = "Total Blocked: " + total_blocked;

// Send a message to the background script to request a counter update.
chrome.runtime.sendMessage({ type: 'request counter' }, (response) => {
    // Handle the response if needed.
    if (response && response.type === 'counter response') {
      // Update the counter display in your popup.
      console.log("Updating counter")
      total_blocked_element.textContent = "Total Blocked: " + response.value;
    }
  });

