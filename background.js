console.log("Starting background.js");
// Load the counter value from Chrome storage.

let counter = 0;
chrome.storage.local.get(['counter'], (result) => {
    if (result.counter !== undefined) {
      counter = result.counter;
    }
  });

//Listen for messages from other scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
    if (message.type === 'update counter'){
      //Grab the counter and += 1 
        let total_count = get_current_counter();
        console.log("Updating counter")
        total_count ++;

        //Store the updated variable and send response that the counter has been updated
        chrome.storage.local.set({'counter':total_count})
        sendResponse({status : 'counter updated'});
    }
    
    else if (message.type === 'request counter'){
      //If the count was requested, grab it and send it back in the response
        let total_count = get_current_counter();

        console.log("Counter requested")
        sendResponse({type: 'counter response', value: total_count})
    }
});


function get_current_counter(){
  //Grab currently stored counter variable from chrome local storage
    chrome.storage.local.get(['counter'], (result) => {
        if (result.counter !== undefined) {
          counter = result.counter;
        }
    });
    return counter;
}
