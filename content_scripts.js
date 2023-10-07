console.log("YAB not allowed script running");

function block_popup_with_text(text_to_find){
    // Grab all pop-up elements on the page
    const popup_elements = document.querySelectorAll('.style-scope.ytd-app');

    //Loop through found elements
    for (const popup of popup_elements){
        let text_in_element = popup.textContent || popup.innerText;
        if (text_in_element.includes(text_to_find)){
            //Remove popup
            popup.remove();

            //Increment the number of blocked popups
            chrome.runtime.sendMessage({type: 'update counter'})

            //Video gets paused when popup occurs, time to unblock the video
            unpause_video();
        }
    }
}

let bad_text = "Ad blockers are not allowed"



/* This code appears to have worked, but the eventListener and DOMSubtreeModifed are deprecated. Using the MutationObserver instead.
// I want to keep the code around just incase I come back to this

document.addEventListener("DOMSubtreeModified", function () {
  console.log("DOMSubtreeModified event detected.");
  block_popup_with_text(bad_text);
});
*/
//Sometimes a popup happens after a page is loaded, use a mutation observer. Credit: https://stackoverflow.com/questions/16618876/determining-if-a-html-element-has-been-added-to-the-dom-dynamically/16618904#16618904
const observer = new MutationObserver(function (mutations){
    //Page mutated!
    mutations.forEach(function (mutation){
        if (mutation.addedNodes && mutation.addedNodes.length > 0){
            block_popup_with_text(bad_text);
        }
    })
})

observer.observe(document, {
    childList: true,
    subtree: true,
});



//Testing purposes, run the function immedietly
block_popup_with_text(bad_text);

//Select the playing video
const playing_video = document.querySelector('video');

function unpause_video(){
    console.log("Attempting Video Unpause")
    //Make sure a video actually exists/is not null
    if (playing_video){
        playing_video.play();
        console.log("Video Resumed")
    }
}

/*
//Testing purposes, add a testing key.
//Unpause video successfully works!

document.addEventListener("keydown", function (event) {
    console.log("Key pressed!")
    if (event.key === "`" || event.key === "~"){
        unpause_video();
    }
});
*/
