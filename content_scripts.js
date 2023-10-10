console.log("YAB not allowed script running");

//Text that will be searched in popup windows. If ant text in the box matches the one below, it will be deleted
const bad_text = [
  "Ad blockers are not allowed",
  "Video player will be blocked",
];

let playing_video = null;
attempt_grabbing_video();

setInterval(() => {
  attempt_grabbing_video();
}, 1000);

document.addEventListener("DOMContentLoaded", function () {
  // This code will run when the DOM content is ready
  attempt_grabbing_video();
});

//Sometimes a popup happens after a page is loaded, use a mutation observer. Credit: https://stackoverflow.com/questions/16618876/determining-if-a-html-element-has-been-added-to-the-dom-dynamically/16618904#16618904
const observer = new MutationObserver(function (mutations) {
  //Page mutated!
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      block_popup_with_text(bad_text);
    }
  });
});
//Set the observer to observe the page
observer.observe(document, {
  childList: true,
  subtree: true,
});

//Attempt blocking instantly
block_popup_with_text(bad_text);

function block_popup_with_text(text_to_find) {
  // Grab all pop-up elements on the page
  const popup_elements = document.querySelectorAll(".style-scope.ytd-app");

  //Loop through found elements
  for (const popup of popup_elements) {
    let text_in_element = popup.textContent || popup.innerText;
    text_to_find.forEach((text) => {
      if (text_in_element.includes(text)) {
        //Remove popup
        popup.remove();

        //Increment the number of blocked popups
        chrome.runtime.sendMessage({ type: "update counter" });

        //Video gets paused when popup occurs, time to unpause the video
        unpause_video();
      }
    });
  }
}

function attempt_grabbing_video() {
  playing_video = document.querySelector("video");

  if (playing_video != null) {
    run_when_video_found();
  }
}

function run_when_video_found() {
  //add check if the user clicked on the video itself to pause or the pause button.
  add_click_pause_event_listener(playing_video);
  add_click_pause_event_listener(document);

  //If the video is paused, determine if it was from a user-click or because it was paused automatically.
  add_pause_handler(playing_video);

  //Check if the user clicked a Media pause key (like on the keyboard)
  add_keypress_listener();

  //Add video ended event listener
  video_ended_event_listener(playing_video);
}

//If the video is paused, determine if it was from a user-click or because it was paused automatically.
function add_pause_handler(vid) {
  vid.addEventListener("pause", () => {
    handle_video_paused();
  });
}

//Check if the user clicked a Media pause key (like on the keyboard)
function add_keypress_listener() {
  document.addEventListener("keydown", (event) => {
    console.log("pressed!");
    if (
      event.key === "MediaPlayPause" ||
      event.key === " " ||
      event.key === "k"
    ) {
      last_click = Date.now();
      handle_video_paused();
    }
  });
}

function video_ended_event_listener(vid) {
  vid.addEventListener("ended", () => {
    last_click = Date.now();
    console.log("Video ended");
  });
}

function unpause_video() {
  //Maybe the video can change(?) so recalculate it.
  playing_video = document.querySelector("video");

  //Make sure a video actually exists/is not null
  if (playing_video && !playing_video.ended) {
    playing_video.play();
    console.log("Video Resumed!");
  }
}

function add_click_pause_event_listener(target) {
  if (target == null) {
    return;
  }
  target.addEventListener("click", () => {
    last_click = Date.now();
    handle_video_paused();
  });
}

let last_click = 0;
function handle_video_paused() {
  const time_elapsed_since_last_click = Date.now() - last_click; //Time in milliseconds
  if (Math.abs(time_elapsed_since_last_click) > 300) {
    unpause_video();
  }
  //Else: Do nothing, let the video get paused since it was most likely a user click pausing the video
}
