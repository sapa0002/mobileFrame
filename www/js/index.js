var pages = [],
    links = [];
var numLinks = 0;
var numPages = 0;
var pageTime = 800; //same as CSS transition
var preTabUrl;

//create the pageShow type event.
var pageshow = document.createEvent("CustomEvent");
pageshow.initEvent("pageShow", false, true);

document.addEventListener("DOMContentLoaded", function () { 
    
   

    pages = document.querySelectorAll('[data-role="page"]');
    numPages = pages.length;
    links = document.querySelectorAll('[data-role="pagelink"]');
    numLinks = links.length;
    for (var i = 0; i < numLinks; i++) {
        links[i].addEventListener("click", handleNav, false);
    }
    //add the listener for pageshow to each page
    for (var p = 0; p < numPages; p++) {
        pages[p].addEventListener("pageShow", handlePageShow, false);
    }
    loadPage(null);
    
    
    
    var svgEmbed = document.querySelector("#homeImg");
    svgEmbed.addEventListener("load", function(){
        preTabUrl="home";
        tabSwitch("home");
    });
    
});

function handleNav(ev) {
    ev.preventDefault();
    var href = ev.target.href;
    console.log(href);
    var parts = href.split("#");
    loadPage(parts[1]);
    return false;
}

function handlePageShow(ev) {
    ev.target.className = "active";
}

function loadPage(url) {
    console.log(url);
    if (url == null) {
        //home page first call
        pages[0].className = 'active';
        history.replaceState(null, null, "#home");      
        
    } else {
        for (var i = 0; i < numPages; i++) {
            pages[i].className = "hidden";
            //get rid of all the hidden classes
            //but make them display block to enable anim.
            if (pages[i].id == url) {
                pages[i].className = "show";
                //add active to the proper page
                history.pushState(null, null, "#" + url);
                setTimeout(addDispatch, 50, i);
            }
        }
        //set the activetab class on the nav menu
        for (var t = 0; t < numLinks; t++) {
            links[t].className = "";
            if (links[t].href == location.href) {
                links[t].className = "activetab";
            }
        }
        
        //If same tab clicked, do nothing
        if(preTabUrl != url)
        {
            //Change selection
            tabSwitch(url);
            preTabUrl=url;
        }
    }
}

function addDispatch(num) {
    pages[num].dispatchEvent(pageshow);
    //num is the value i from the setTimeout call
    //using the value here is creating a closure
}



//When tabs are switched...

function tabSwitch(currentTab) {
    if (currentTab == "home") {
        //On the Home tab
          var localHome1 = document.getElementById("homeImg").contentDocument.querySelector("#Capa_home");

          localHome1.style.backgroundColor="grey"
        

        //the Location Tab
        var localLocation1 = document.getElementById("locationsImg").contentDocument.querySelector("#Capa_location");
       
        localLocation1.style.backgroundColor="green"

        // the ContactTab
        var localContact1 = document.getElementById("contactsImg").contentDocument.querySelector("#Capa_contact");
       
        localContact3.style.backgroundColor="green"

    } else if (currentTab == "locations") {
        
        //The home tab
        var localHome2 = document.getElementById("homeImg").contentDocument.querySelector("#Capa_home");
 
        localHome2.style.backgroundColor="green"
        //On the Location Tab
        var localLocation2 = document.getElementById("locationsImg").contentDocument.querySelector("#Capa_location");
  
         localLocation2.style.backgroundColor="grey"
         
        //The ContactTab
        var localContact2 = document.getElementById("contactsImg").contentDocument.querySelector("#Capa_contact");
        
         localContact2.style.backgroundColor="green"
        
        //function  locations.js
        createLocations();
        
    } else if (currentTab == "contacts") {
        
        // the home tab
        var localHome3 = document.getElementById("homeImg").contentDocument.querySelector("#Capa_home");
      
         localHome3.style.backgroundColor="green"

        // the Locations Tab
        var localLocation3 = document.getElementById("locationsImg").contentDocument.querySelector("#Capa_location");
      
        localLocation3.style.backgroundColor="green"

        // On the Contacts Tab
        var localContact3 = document.getElementById("contactsImg").contentDocument.querySelector("#Capa_contact");
        //console.log(localContact3);
         localContact3.style.backgroundColor="red"
        
        
        //fucntion from contacts.js
        fetchingContacts();
    }
}

//codepan example to handle 300ms delay, 
function touchHandler(ev){

  //this function will run when the touch events happen
  if( ev.type == "touchend"){
    ev.preventDefault();
    var touch = evt.changedTouches[0];        //this is the first object touched
    
    var newEvt = document.createEvent("MouseEvent");    //old method works across browsers, though it is deprecated.
    /**
    event.initMouseEvent(type, canBubble, cancelable, view,
                     detail, screenX, screenY, clientX, clientY,
                     ctrlKey, altKey, shiftKey, metaKey,
                     button, relatedTarget); **/
    newEvt.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY);
    //var newEvt = new MouseEvent("click");             //new method
    //REF: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.MouseEvent
    ev.currentTarget.dispatchEvent(newEvt);
    //change the touchend event into a click event and dispatch it immediately
    //this will skip the built-in 300ms delay before the click is fired by the browser
  }
}