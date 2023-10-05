console.log("YAB not allowed script is being run.")

function block_popup_with_text(text_to_find){
    // Grab all pop-up elements on the page
    const popup_elements = document.querySelectorAll('.style-scope.ytd-app');

    //Loop through found elements
    for (const popup of popup_elements){
        let text_in_element = popup.textContent || popup.innerText;
        if (text_in_element.includes(text_to_find)){
            //Remove popup
            popup.remove();
            console.log("Popup removed!")
        }
    }
}

let bad_text = "Ad blockers are not allowed"

//Sometimes a popup happens after a page is loaded, use an event listener
document.addEventListener('DOMContentLoaded', function() {
    block_popup_with_text(bad_text);
})


