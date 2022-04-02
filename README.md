# rplaceukraine2022
Node script for helping out Ukraine on Reddit r/place
For tech savvy guys out there. Change however you'll need.
It updates from top left to bottom right - row by row and compares existing color to the desired template color.
https://github.com/timotr/rplaceukraine2022

Author
Discord: Apdea#2306
Reddit: /u/ApDea

## How to run

Install Node https://nodejs.org/en/download/

Download zip from green Code button up here.

Get your Bearer token from Dev Tools (F12, Network tab) after sending one pixel and replace it in script.
There is image how_to_get_token_browser.PNG, but we could use a better tutorial.
Search for `https://gql-realtime-2.reddit.com/query` to find "send pixel" request faster.
(There is also a way to generate token with Reddit API, help me out if you know how to)

When you got token insert it into `index.js`. Also keep your browser open so the token won't invalidate.

    token = "22979151-AfsTlPDMfK4XwGoYo2Uw0Al8x2fGrw" // <--- your own secret code will go between here
    templateImageAddress = "placeukraine.png" // can be both local and http
    templateOffsetX = 0; // where to start printing on the full image
    templateOffsetY = 169;

Open Terminal or Command Line tool in project folder. If you need help Google `how to open terminal in folder`.

Execute command to start script

    node .


## How to update image

Colors that don't match with Reddit's original color map will be skipped. Use this to create free for all zones.
I used random purple color in Photoshop file (you can move layers there for alliances).

Right now template is on github, you'll need to send pull request to update it. If you have ideas how to make image update easier, let me know.
You can always change template url inside `index.js`
Template:
https://raw.githubusercontent.com/timotr/rplaceukraine2022/main/placeukraine.png
Also PSD file with layers.
