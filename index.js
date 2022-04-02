var getPixels = require("get-pixels")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

token = "27979151-uSKHBUVjn1YQW5MlC2mCgL9_jF7OZA" // <--- your own secret code will go between here
templateImageAddress = "https://raw.githubusercontent.com/timotr/rplaceukraine2022/main/placeukraine.png" // can be both local and http like https://raw.githubusercontent.com/timotr/rplaceukraine2022/main/placeukraine.png
templateOffsetX = 0; // where to start printing on the full image
templateOffsetY = 169;

function sendPixel(x,y,color) {
	let raw = JSON.stringify({
		"operationName": "setPixel",
		"variables": {
		  "input": {
			"actionName": "r/replace:set_pixel",
			"PixelMessageData": {
			  "coordinate": {
				"x": x,
				"y": y
			  },
			  "colorIndex": color,
			  "canvasIndex": 0
			}
		  }
		},
		"query": "mutation setPixel($input: ActInput!) {\n  act(input: $input) {\n    data {\n      ... on BasicMessage {\n        id\n        data {\n          ... on GetUserCooldownResponseMessageData {\n            nextAvailablePixelTimestamp\n            __typename\n          }\n          ... on SetPixelResponseMessageData {\n            timestamp\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
	  });
	return fetch("https://gql-realtime-2.reddit.com/query", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+token,
		},
		redirect: 'follow',
		body: raw,
	})
}

colorMap = {
    "#ff4500": 2,  // bright red
    "#ffa800": 3,  // orange
    "#ffd635": 4,  // yellow
    "#00a368": 6,  // darker green
    "#7eed56": 8,  // lighter green
    "#2450a4": 12,  // darkest blue
    "#3690ea": 13,  // medium normal blue
    "#51e9f4": 14,  // cyan
    "#811e9f": 18,  // darkest purple
    "#b44ac0": 19,  // normal purple
    "#ff99aa": 23,  // pink
    "#9c6926": 25,  // brown
    "#000000": 27,  // black
    "#898d90": 29,  // grey
    "#d4d7d9": 30,  // light grey
    "#ffffff": 31,  // white
}

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getPixel(array,x,y) {
	return rgbToHex(
		array.data[array.offset + array.stride[0] * x + array.stride[1] * y ],
		array.data[array.offset + array.stride[0] * x + array.stride[1] * y+1 ],
		array.data[array.offset + array.stride[0] * x + array.stride[1] * y+2 ],
	)
}

function update() {
	console.log("Time to update!")
	// Get real-time image
	fetch("https://canvas.codes/canvas").then(res => res.json()).then(res => {
		// Get template image
		getPixels(templateImageAddress, function(err, templatePixels) {
			if(err) {
				console.log("Bad image path")
				return
			}
			let templateSize = templatePixels.shape.slice();
			// Open online image
			getPixels(res.url, function(err, onlinePixels) {
				if(err) {
				  console.log("Bad image path")
				  return
				}

				// Compare and find pixels that need update
				for (let x = 0; x < templateSize[0]; x++) {
					for (let y = 0; y < templateSize[1]; y++) {
						let templateColor = getPixel(templatePixels, x, y);
						let onlineColor = getPixel(onlinePixels, x+templateOffsetX, y+templateOffsetY)
						if (templateColor !== onlineColor) {
							if (typeof colorMap[templateColor] === "undefined") {
								console.log(`Invalid color on template (${x} y:${y} color:${templateColor}) skipping this one`)
							} else {
								console.log(`Needs update x:${x} y:${y} colorIndex:${colorMap[templateColor]} color:${templateColor}`)
								sendPixel(x,y,colorMap[templateColor]).then((res) => {
									//console.log(res)
									if (res.status >= 200 && res.status <= 299) {
										console.log("Success!")
									} else {
										console.log("Failure!", res.status, res.statusText)
									}
								}).catch((err) => {
									console.log("Failure!", err)
								}).finally(() => {
									// Wait for next update
									console.log("Waiting for 5mins now...")
									setTimeout(update, 5*60*1000+5); //5min + 5 extra delay
								});
								return; // Break loops
							}
						}
					}
				}
			})
		})
	})
}

//setInterval(update, 5*60*1000+5); //5min + 5 extra delay
update()


/*
color_map = {
    "#FF4500": 2,  // bright red
    "#FFA800": 3,  // orange
    "#FFD635": 4,  // yellow
    "#00A368": 6,  // darker green
    "#7EED56": 8,  // lighter green
    "#2450A4": 12,  // darkest blue
    "#3690EA": 13,  // medium normal blue
    "#51E9F4": 14,  // cyan
    "#811E9F": 18,  // darkest purple
    "#B44AC0": 19,  // normal purple
    "#FF99AA": 23,  // pink
    "#9C6926": 25,  // brown
    "#000000": 27,  // black
    "#898D90": 29,  // grey
    "#D4D7D9": 30,  // light grey
    "#FFFFFF": 31,  // white
}

var modhash = window.reddit.modhash;
var sec = 0;
setInterval(function(){
	console.log("Drawing in " + (sec--) + " seconds"); 
	if(sec<=0){
		sec = 30;
	}
}, 1000);

const draw = function(seconds){
	
	sec = seconds = Math.ceil(seconds)
	
	setTimeout(function(){
		
		var colourNames = ["white", "light grey", "dark grey", "black", "pink", "red", "orange", "brown", "yellow", "light green", "dark green", "light blue", "medium blue", "dark blue", "light purple", "dark purple"]
	
		var url = "https://rawgit.com/DollarAkshay/Miscelaneous/master/Reddit%20Place%20India%20Flag%20%2B%20Pakistan%20Bitmap.js";

		$.getScript(url)
		.done(function( script, textStatus ) {
			
			console.log("Bitmap Loaded...");
			var xhttp = new XMLHttpRequest();
			xhttp.responseType = "arraybuffer";
			xhttp.open("GET", "https://www.reddit.com/api/place/board-bitmap", true);
			xhttp.onload = function(t) {
				var n = xhttp.response;
				var s = new Uint8Array(n, 4);
				
				var canvas = [];
				for(var i=0; i<1000; i++){
					canvas.push([]);
					for(var j=0; j<1000; j++){
						canvas[i].push(0);
					}
				}
				
				for(var i = 0; i<500000; i++){
					var x1 = (i*2+0)%1000, y1 = Math.floor((i*2+0)/1000);
					var x2 = (i*2+1)%1000, y2 = Math.floor((i*2+1)/1000);
					canvas[y1][x1] = s[i]>>>4;
					canvas[y2][x2] = s[i] & 15;
				}
				
				var repairCells = [];
				for(var i=0; i<height; i++){
					for(var j=0; j<bitMap[i].length; j++){
						if( canvas[startY+i][startX+j] != bitMap[i][j]){
							repairCells.push([startX+j, startY+i]);
						}
					}
				}
				
				if(repairCells.length){
					var cellIndex = Math.floor(Math.random() * repairCells.length);
					var cx = repairCells[cellIndex][0], cy = repairCells[cellIndex][1];
					var cellColour = bitMap[cy-startY][cx-startX];
					console.log("################################"); 
					console.log("Drawing at "+cx+", "+cy); 
					console.log("Replacing '"+colourNames[canvas[cy][cx]]+"' with '"+colourNames[bitMap[cy-startY][cx-startX]]+"' colour");
					console.log("################################"); 
					console.log(""); 
					
					$.ajax({ url: "https://www.reddit.com/api/place/draw.json",type: "POST",
						headers: { "x-modhash": modhash },	data: { x: cx,y: cy, color: cellColour }
					})
					.done(function(data) {
						draw(data.wait_seconds);
					})
					.error(function(data){
						if(data == null || data.responseJSON == null || typeof data.responseJSON.wait_seconds === 'undefined' || data.responseJSON.wait_seconds == null){
							draw(60);
						}
						else{
							draw(data.responseJSON.wait_seconds);
						}
					}
					);
				}
				else{
					console.log("################################"); 
					console.log("Flag is Perfect. Not going to draw.");
					console.log("################################"); 
					draw(30);
				}
				
			}
			xhttp.send();
			
		})
		.fail(function( jqxhr, settings, exception ) {
			console.log( "Triggered ajaxError handler." );
			draw(30);
		});
	}, Math.abs(seconds) * 1000);
}
draw(0);*/