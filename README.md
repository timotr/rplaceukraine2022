# rplaceukraine2022
Node script for helping out Ukraine on Reddit r/place
https://github.com/timotr/rplaceukraine2022

## How to run

Install Node https://nodejs.org/en/download/

Download zip from green Code button up here.

Get your Bearer token from Dev Tools (F12, Network tab) after sending one pixel and replace it in script.
There is image how_to_get_token_browser.PNG, but we could use a better tutorial.
Search for `https://gql-realtime-2.reddit.com/query` to find "send pixel" request faster.

When you got token insert it into `index.js`

    token = "22979151-AfsTlPDMfK4XwGoYo2Uw0Al8x2fGrw" // <--- your own secret code will go between here
    templateImageAddress = "placeukraine.png" // can be both local and http
    templateOffsetX = 0; // where to start printing on the full image
    templateOffsetY = 169;

Open Terminal or Command Line tool in project folder. If you need help Google `how to open terminal in folder`.

Execute command to start script

    node .


## How to update image

Colors that don't match with Reddit's original color map will be skipped. Use this to create free for all zones.
I used random purple color in Photoshop file.
