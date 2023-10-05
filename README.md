# Youtube-Adblock-Not-Allowed-Blocker
My attempt at creating a simple Chrome extension that blocks the youtube popup "Adblockers are not allowed on youtube"

# Files
-----------
- background.js  - The background service worker allows a counter of the total amount of blocked popups.
- content_script.js  - The script that deletes the content from the YouTube page. It does this by searching for the "style-scope ytd-app" tag as I noticed all of youtubes pop-ups included it. It then searches for the content of "Ad blockers are not allowed" as any popup that includes those words is most likely the popup we are looking to block. This may run into issues if you create a playlist called "Ad blockers are not allowed" as the playlist selection box is also a pop-up.
- dummy_website.html  -  A Dummy website that I made that includes the exact element that I want to delete and a button to add it back. This was used for testing the extension
- intro.html  -  The HTML page used when you select the extension in the top right. Only includes the name and a number blocked counter
- manifest.json  -  The manifest file that states how the chrome extension should be set up.
- popup.js  -  The js file that includes all the code to update the counter in the top right extension menu
- README.md  -  This file :)
- YT_block.png  -  A simple image of the youtube logo with an X over it since I just wanted a quick logo
