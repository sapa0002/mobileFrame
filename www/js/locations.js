// JavaScript Document

var container;

var canvas;
var parameters;

	
function createLocations(){
	console.log("createLocations");
//	container = document.createElement("div");
//	container.setAttribute("class", "locationsDiv");
//	document.querySelector(".locationsDiv").appendChild(container);
	var container=document.querySelector("#locationsDiv")
	
	//no geolocation API in the browser
	if(!navigator.geolocation){
		//error message
		
		container.innerHTML="Your browser doesn't support geolocation API.";
        
			
	}else {
       // yesLocation();
    
    function yesLocation(position){
	
	var lngt = position.coords.longitude;
	var ltd = position.coords.latitude;
        console.log(position);
	document.querySelector("#locationsDiv").innerHTML = "";
	//use canvas to create an img
	canvas = document.createElement("canvas");
	canvas.setAttribute("class", "canvas");
	document.querySelector("#locationsDiv").appendChild(canvas);
	canvas.width = "400";
	canvas.height = "400";
	var context = canvas.getContext("2d");
	var img = new Image ();
	
	img.onload = function () {
		context.drawImage(img, 0, 0);
	}; 
	img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + ltd + "," + lngt +  "&zoom=14&size=400x400&sensor=false&markers=color:orange%7Clabel:N%7C" + ltd + "," + lngt + "";
	
};

function noLocation() {
	
		document.querySelector("#yourLocation").innerHTML = "";
		errorMessage = document.createElement("div");
		errorMessage.setAttribute("id", "errorContainer");
		document.body.appendChild(errorMessage);
		errorMessage.innerHTML="Your location is uknown";	

};

    
    container.innerHTML = "<p id = 'yourLocation' style='text-align: center'>Your location is </p>";
		parameters = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0	
		}
		
	navigator.geolocation.getCurrentPosition(yesLocation, noLocation, parameters);	
    }
};
	

	
	
